import { useState } from "react";
import { Box, Container } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ProfileTabs,
  type ProfileTabValue,
} from "../../../components/layout/ProfileTabs";
import { SearchBar } from "../../../components/layout/SearchBar";
import { PatientsTable } from "../components/PatientsTable";
import { usePatientsFlat } from "../hooks/usePatients";
import { useDebounce } from "../../../hooks/useDebounce";
import { reCertifyPatient, pauseAllSequences } from "../../../services/patientService";
import styles from "./PatientsPage.module.css";
import { ReCertifiedPatientsTable } from "../components/ReCertifiedPatientsTable";

export function PatientsPage() {
  const [activeTab, setActiveTab] = useState<ProfileTabValue>("discharged");
  const [searchQuery, setSearchQuery] = useState("");
  const [reCertifiedIds, setReCertifiedIds] = useState<Set<string>>(new Set());
  const debouncedSearch = useDebounce(searchQuery, 300);
  const queryClient = useQueryClient();

  const {
    data: patients = [],
    hasMore,
    fetchNextPage,
    isFetchingNextPage,
  } = usePatientsFlat(activeTab, debouncedSearch);

  const reCertifyMutation = useMutation({
    mutationFn: ({
      patientId,
      reason,
    }: {
      patientId: string;
      reason: string;
    }) => reCertifyPatient(patientId, { stateNote: reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients", "discharged"] });
      queryClient.invalidateQueries({ queryKey: ["patients", "re-certified"] });
    },
  });

  const pauseAllSequencesMutation = useMutation({
    mutationFn: (patientId: string) => pauseAllSequences(patientId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients", "discharged"] });
    },
  });

  const filteredPatients =
    activeTab === "discharged"
      ? patients.filter((patient) => !reCertifiedIds.has(patient.id))
      : patients;

  const handlePatientClick = (patientId: string) => {
    console.log("Navigate to patient:", patientId);
  };

  const handleActionClick = (
    patientId: string,
    action: string,
    reason?: string
  ) => {
    if (action === "re-certify" && reason) {
      setReCertifiedIds((prev) => new Set(prev).add(patientId));
      reCertifyMutation.mutate({ patientId, reason });
    } else if (action === "pause") {
      pauseAllSequencesMutation.mutate(patientId);
    } else {
      console.log("Action:", action, "on patient:", patientId);
    }
  };

  const handleLoadMore = () => {
    fetchNextPage();
  };

  const handleTabChange = (value: ProfileTabValue) => {
    setActiveTab(value);
  };

  return (
    <Container maxWidth={false} className={styles.contentContainer}>
      <Box className={styles.tabsSearchWrapper}>
        <ProfileTabs value={activeTab} onChange={handleTabChange} />
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </Box>
      {activeTab === "re-certified" ? (
        <ReCertifiedPatientsTable
          patients={filteredPatients}
          hasMore={hasMore}
          onPatientClick={handlePatientClick}
          onLoadMore={handleLoadMore}
          isLoadingMore={isFetchingNextPage}
        />
      ) : (
        <PatientsTable
          patients={filteredPatients}
          hasMore={hasMore}
          onPatientClick={handlePatientClick}
          onActionClick={handleActionClick}
          onLoadMore={handleLoadMore}
          isLoadingMore={isFetchingNextPage}
        />
      )}
    </Container>
  );
}
