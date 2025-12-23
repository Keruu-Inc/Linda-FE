import apiClient from "./apiClient";
import type { ApiPatientResponse } from "../features/profiles/types";

export interface CreatePatientRequest {
  firstName: string;
  middleName: string;
  lastName: string;
  genderId: string;
  dateOfBirth: string;
  statusId: string;
  diagnosisId: string;
  veteranStatusId: string;
  branchId: string;
  contactMethodId: string;
  addressLine1: string;
  addressLine2?: string;
  addressCity: string;
  addressState: string;
  addressZipCode: string;
  phoneNumber: string;
  email?: string;
  dischargeDateAtUtc?: string;
  primaryPhysicianName: string;
  accountExecutiveName: string;
  referralName: string;
  referralDateAtUtc: string;
  payerTypeId: string;
}

export interface Patient {
  id: string;
  timestamp: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: {
    id: string;
    title: string;
  };
  dateOfBirth: string;
  email?: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  addressCity: string;
  addressState: string;
  addressZipCode: string;
  diagnosis: {
    id: string;
    title: string;
  };
  veteranStatus: {
    id: string;
    title: string;
  };
  branch: {
    id: string;
    title: string;
  };
  status: {
    id: string;
    title: string;
  };
  payerType: {
    id: string;
    title: string;
  };
  contactMethod: {
    id: string;
    title: string;
  };
  dischargeDateAtUtc?: string;
  primaryPhysicianName: string;
  accountExecutiveName: string;
  referralName: string;
  referralDateAtUtc: string;
}

export interface CreatePatientResponse {
  item: Patient;
}

export interface GetPatientsParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
}

export interface ReCertifyPatientRequest {
  stateNote: string;
}

export const getPatients = async (
  params: GetPatientsParams
): Promise<ApiPatientResponse> => {
  const queryParams = new URLSearchParams();

  if (params.pageIndex !== undefined) {
    queryParams.append("pageIndex", String(params.pageIndex));
  }
  if (params.pageSize !== undefined) {
    queryParams.append("pageSize", String(params.pageSize));
  }
  if (params.search) {
    queryParams.append("search", params.search);
  }

  const response = await apiClient.get<ApiPatientResponse>(
    `/api/customer/patients?${queryParams.toString()}`
  );
  return response.data;
};

export const createPatient = async (
  data: CreatePatientRequest
): Promise<CreatePatientResponse> => {
  const response = await apiClient.post("/api/patients", data);
  return response.data;
};

export const reCertifyPatient = async (
  patientId: string,
  data: ReCertifyPatientRequest
): Promise<void> => {
  await apiClient.put(`/api/patients/${patientId}/reCertify`, data);
};

export const pauseAllSequences = async (patientId: string): Promise<void> => {
  await apiClient.put(`/api/patients/${patientId}/pauseAllSequences`, {});
};


