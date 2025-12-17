import { useQuery } from '@tanstack/react-query';
import {
  getGenders,
  getDiagnoses,
  getVeteranStatuses,
  getBranches,
  getContactMethods,
  getPatientStatuses,
  getPayerTypes,
} from '../services/dropdownService';

export const useGenders = () => {
  return useQuery({
    queryKey: ['genders'],
    queryFn: getGenders,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useDiagnoses = () => {
  return useQuery({
    queryKey: ['diagnoses'],
    queryFn: getDiagnoses,
    staleTime: 5 * 60 * 1000,
  });
};

export const useVeteranStatuses = () => {
  return useQuery({
    queryKey: ['veteranStatuses'],
    queryFn: getVeteranStatuses,
    staleTime: 5 * 60 * 1000,
  });
};

export const useBranches = () => {
  return useQuery({
    queryKey: ['branches'],
    queryFn: getBranches,
    staleTime: 5 * 60 * 1000,
  });
};

export const useContactMethods = () => {
  return useQuery({
    queryKey: ['contactMethods'],
    queryFn: getContactMethods,
    staleTime: 5 * 60 * 1000,
  });
};

export const usePatientStatuses = () => {
  return useQuery({
    queryKey: ['patientStatuses'],
    queryFn: getPatientStatuses,
    staleTime: 5 * 60 * 1000,
  });
};

export const usePayerTypes = () => {
  return useQuery({
    queryKey: ['payerTypes'],
    queryFn: getPayerTypes,
    staleTime: 5 * 60 * 1000,
  });
};
