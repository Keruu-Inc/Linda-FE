import { useInfiniteQuery } from "@tanstack/react-query";
import type { Patient, PatientStatus } from "../types";
import { getPatients } from "../../../services/patientService";
import { mapPatientToPatient } from "../utils/mapPatientToPatient";

const DEFAULT_PAGE_SIZE = 10;

type PatientPage = { patients: Patient[]; hasMore: boolean };

export function usePatients(
  status: PatientStatus,
  searchQuery?: string,
  pageSize: number = DEFAULT_PAGE_SIZE
) {
  return useInfiniteQuery<PatientPage, Error>({
    queryKey: ["patients", status, searchQuery, pageSize],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getPatients({
        pageIndex: pageParam as number,
        pageSize,
        search: searchQuery,
      });

      let patients = response.items;

      if (status === "discharged") {
        patients = patients.filter(
          (p) => p.state.isDischarged && !p.state.isRecertified
        );
      } else if (status === "re-certified") {
        patients = patients.filter((p) => p.state.isRecertified);
      } else if (status === "archived") {
        patients = patients.filter(
          (p) => !p.state.isDischarged && !p.state.isRecertified
        );
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        patients = patients.filter((patient) => {
          const fullName = [
            patient.firstName,
            patient.middleName,
            patient.lastName,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
          return (
            patient.id.toLowerCase().includes(query) || fullName.includes(query)
          );
        });
      }

      return {
        patients: patients.map(mapPatientToPatient),
        hasMore: response.hasMore,
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });
}

// Helper hook to flatten pages
export function usePatientsFlat(
  status: PatientStatus,
  searchQuery?: string,
  pageSize: number = DEFAULT_PAGE_SIZE
) {
  const query = usePatients(status, searchQuery, pageSize);

  return {
    ...query,
    data: query.data?.pages.flatMap((page) => page.patients) ?? [],
    hasMore: query.data?.pages[query.data.pages.length - 1]?.hasMore ?? false,
  };
}
