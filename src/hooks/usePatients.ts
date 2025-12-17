import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPatient, type CreatePatientRequest } from '../services/patientService';

export const useCreatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePatientRequest) => createPatient(data),
    onSuccess: () => {
      // Invalidate and refetch patients list if you have one
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });
};
