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
  const { data } = await apiClient.get('/api/genders');
  return data;
};

export const getDiagnoses = async (): Promise<DropdownResponse<DropdownItem>> => {
  const { data } = await apiClient.get('/api/diagnosises');
  return data;
};

export const getVeteranStatuses = async (): Promise<DropdownResponse<DropdownItem>> => {
  const { data } = await apiClient.get('/api/veteranStatuses');
  return data;
};

export const getBranches = async (): Promise<DropdownResponse<DropdownItem>> => {
  const { data } = await apiClient.get('/api/branches');
  return data;
};

export const getContactMethods = async (): Promise<DropdownResponse<DropdownItem>> => {
  const { data } = await apiClient.get('/api/contactMethods');
  return data;
};

export const getPatientStatuses = async (): Promise<DropdownResponse<PatientStatus>> => {
  const { data } = await apiClient.get('/api/patientStatuses');
  return data;
};

export const getPayerTypes = async (): Promise<DropdownResponse<DropdownItem>> => {
  const { data } = await apiClient.get('/api/payerTypes');
  return data;
};
