import { Box, Button } from "@mui/material";
import type { Patient } from "../types";
import { formatDate } from "../../../utils/date";
import { formatProfileId } from "../../../utils/formatters";
import { DataTable, type Column } from "../../../components/ui/DataTable";
import styles from "./ReCertifiedPatientsTable.module.css";

interface ReCertifiedPatientsTableProps {
  patients: Patient[];
  hasMore?: boolean;
  onPatientClick?: (patientId: string) => void;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
}

export function ReCertifiedPatientsTable({
  patients,
  hasMore = false,
  onPatientClick,
  onLoadMore,
  isLoadingMore = false,
}: ReCertifiedPatientsTableProps) {
  const formatDateOnly = (date: string | null | undefined) => {
    if (!date) return "-";
    try {
      return formatDate(date, "MM/dd/yyyy");
    } catch {
      return date;
    }
  };

  const columns: Column<Patient>[] = [
    {
      id: "id",
      label: "ID",
      width: 80,
      align: "left",
      render: (patient) => formatProfileId(patient.id),
    },
    {
      id: "patientName",
      label: "Profile Name",
      width: 150,
      align: "left",
      render: (patient) => (
        <span style={{ fontWeight: 500 }}>{patient.patientName}</span>
      ),
    },
    {
      id: "dischargeDate",
      label: "Discharged Date",
      width: 150,
      align: "left",
      render: (profile) => formatDateOnly(profile.dischargeDate),
    },
    {
      id: "reCertifiedDate",
      label: "Re-Certified Date",
      width: 150,
      align: "left",
      render: (profile) => formatDateOnly(profile.reCertifiedDate),
    },
    {
      id: "reason",
      label: "Reason",
      width: 300,
      align: "left",
      render: (profile) => profile.reason || "-",
    },
  ];

  return (
    <Box>
      <DataTable
        columns={columns}
        rows={patients}
        getRowId={(patient) => patient.id}
        onRowClick={(patient) => onPatientClick?.(patient.id)}
      />
      {hasMore && (
        <Box className={styles.loadMoreContainer}>
          <Button
            variant="outlined"
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className={styles.loadMoreButton}
          >
            {isLoadingMore ? "Loading..." : "Load More"}
          </Button>
        </Box>
      )}
    </Box>
  );
}
