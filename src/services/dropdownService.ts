import apiClient from './apiClient';

export interface DropdownItem {
  id: string;
  timestamp: string;
  title: string;
  name: string;
  description: string | null;
}

export interface PatientStatus extends DropdownItem {
  isDefault: boolean;
  isActive: boolean;
  isProgramDefault: boolean;
  order: number;
}

export interface DropdownResponse<T> {
  items: T[];
  hasMore: boolean;
}

// API functions
export const getGenders = async (): Promise<DropdownResponse<DropdownItem>> => {
  const { data } = await apiClient.get('/test/genders');
  return data;
};

export const getDiagnoses = async (): Promise<DropdownResponse<DropdownItem>> => {
  const { data } = await apiClient.get('/test/diagnosises');
  return data;
};

export const getVeteranStatuses = async (): Promise<DropdownResponse<DropdownItem>> => {
  const { data } = await apiClient.get('/test/veteranStatuses');
  return data;
};

export const getBranches = async (): Promise<DropdownResponse<DropdownItem>> => {
  const { data } = await apiClient.get('/test/branches');
  return data;
};

export const getContactMethods = async (): Promise<DropdownResponse<DropdownItem>> => {
  const { data } = await apiClient.get('/test/contactMethods');
  return data;
};

export const getPatientStatuses = async (): Promise<DropdownResponse<PatientStatus>> => {
  const { data } = await apiClient.get('/test/patientStatuses');
  return data;
};

export const getPayerTypes = async (): Promise<DropdownResponse<DropdownItem>> => {
  const { data } = await apiClient.get('/test/payerTypes');
  return data;
};
