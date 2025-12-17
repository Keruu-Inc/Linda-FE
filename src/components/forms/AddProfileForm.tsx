import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from '@mui/material';
import {
  useGenders,
  useDiagnoses,
  useVeteranStatuses,
  useBranches,
  useContactMethods,
  usePayerTypes,
} from '../../hooks/useDropdowns';

const addProfileSchema = z.object({
  // Section 1: Discharged Patient Details
  fullName: z.string().min(1, 'Full name is required'),
  gender: z.string().min(1, 'Gender is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  homeAddress: z.string().min(1, 'Home address is required'),
  phone: z.string().min(1, 'Phone number is required'), // TODO: Add phone mask
  diagnosis: z.string().min(1, 'Diagnosis is required'),
  dischargeDate: z.string().min(1, 'Discharge date is required'),
  veteranStatus: z.string().min(1, 'Veteran status is required'),
  
  // Section 2: Additional Information
  email: z.email('Email is required'),
  branchLocation: z.string().min(1, 'Branch location is required'),
  payerType: z.string().min(1, 'Payer type is required'),
  referralSource: z.string().optional(),
  
  // Section 3: Contact Method
  contactPriority: z.string().min(1, 'Contact priority is required'),
  
  // Section 4: No1 Alternative Contact
  altContact1FullName: z.string().min(1, 'Alternative contact name is required'),
  altContact1Phone: z.string().min(1, 'Alternative contact phone is required'), // TODO: Add phone mask
  altContact1Relationship: z.string().min(1, 'Relationship is required'),
  altContact1Email: z.email('Invalid email').or(z.literal('')),
  altContact1MainPOC: z.boolean(),
  
  // Section 5: No2 Alternative Contact
  altContact2FullName: z.string().optional(),
  altContact2Phone: z.string().optional(), // TODO: Add phone mask
  altContact2Relationship: z.string().optional(),
  altContact2Email: z.email('Invalid email').or(z.literal('')),
  altContact2MainPOC: z.boolean(),
});

type AddProfileFormData = z.infer<typeof addProfileSchema>;

interface AddProfileFormProps {
  onSubmit: (data: AddProfileFormData) => void;
  onValidityChange?: (isValid: boolean) => void;
}

export function AddProfileForm({ onSubmit, onValidityChange }: AddProfileFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AddProfileFormData>({
    mode: 'onChange',
    resolver: zodResolver(addProfileSchema),
    defaultValues: {
      fullName: '',
      gender: '',
      dateOfBirth: '',
      homeAddress: '',
      phone: '',
      diagnosis: '',
      dischargeDate: '',
      veteranStatus: '',
      email: '',
      branchLocation: '',
      payerType: '',
      referralSource: '',
      contactPriority: '',
      altContact1FullName: '',
      altContact1Phone: '',
      altContact1Relationship: '',
      altContact1Email: '',
      altContact1MainPOC: false,
      altContact2FullName: '',
      altContact2Phone: '',
      altContact2Relationship: '',
      altContact2Email: '',
      altContact2MainPOC: false,
    },
  });

  // Notify parent of validity changes
  React.useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

  // Fetch dropdown data
  const { data: gendersData, isLoading: gendersLoading } = useGenders();
  const { data: diagnosesData, isLoading: diagnosesLoading } = useDiagnoses();
  const { data: veteranStatusesData, isLoading: veteranStatusesLoading } = useVeteranStatuses();
  const { data: branchesData, isLoading: branchesLoading } = useBranches();
  const { data: contactMethodsData, isLoading: contactMethodsLoading } = useContactMethods();
  const { data: payerTypesData, isLoading: payerTypesLoading } = usePayerTypes();

  const formSectionSx = {
    bgcolor: '#fff',
    borderRadius: 2.5,
    border: '1px solid #edf0f6ff',
    boxShadow: '0px 2px 20px 0px #d6d4f04d',
    px: 3,
    py: 3.5,
  };

  const formTextFieldSx = {
    '& .MuiOutlinedInput-root': {
        borderRadius: 10,
    },
  };

  const formSelectSx = {
    borderRadius: 10,
  };

  return (
    <Box
        sx={{
            width: '100%',
            maxWidth: 600,
        }}
    >
        <form onSubmit={handleSubmit(onSubmit)} id="add-profile-form">
            <Box sx={{gap: 3, display: 'flex', flexDirection: 'column'}}>
                <Box sx={{ ...formSectionSx }}>
                    {/* Section 1: Discharged Patient Details */}
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>
                        Discharged Patient Details*
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Controller
                        name="fullName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                            {...field}
                            sx={{ ...formTextFieldSx }}
                            label="Enter full name*"
                            error={!!errors.fullName}
                            helperText={errors.fullName?.message}
                            fullWidth
                            />
                        )}
                        />

                        <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth error={!!errors.gender} disabled={gendersLoading}>
                            <InputLabel>Select gender*</InputLabel>
                            <Select {...field} label="Select gender*" sx={{ ...formSelectSx }}>
                                {gendersLoading ? (
                                <MenuItem disabled>
                                    <CircularProgress size={20} />
                                </MenuItem>
                                ) : (
                                gendersData?.items.map((gender) => (
                                    <MenuItem key={gender.id} value={gender.id}>
                                    {gender.title || gender.name}
                                    </MenuItem>
                                ))
                                )}
                            </Select>
                            {errors.gender && (
                                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                                {errors.gender.message}
                                </Typography>
                            )}
                            </FormControl>
                        )}
                        />

                        {/* TODO: Replace these components with a DatePicker component */}
                        <Controller
                        name="dateOfBirth"
                        control={control}
                        render={({ field }) => (
                            <TextField
                            {...field}
                            sx={{ ...formTextFieldSx }}
                            label="Date of birth*"
                            type="date"
                            slotProps={{ inputLabel: { shrink: true } }}
                            error={!!errors.dateOfBirth}
                            helperText={errors.dateOfBirth?.message}
                            fullWidth
                            />
                        )}
                        />

                        <Controller
                        name="homeAddress"
                        control={control}
                        render={({ field }) => (
                            <TextField
                            {...field}
                            sx={{ ...formTextFieldSx }}
                            label="Enter home address*"
                            error={!!errors.homeAddress}
                            helperText={errors.homeAddress?.message}
                            fullWidth
                            />
                        )}
                        />

                        <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <TextField
                            {...field}
                            sx={{ ...formTextFieldSx }}
                            label="+1 (555) 000-0000*"
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                            fullWidth
                            />
                        )}
                        />

                        <Controller
                        name="diagnosis"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth error={!!errors.diagnosis} disabled={diagnosesLoading}>
                            <InputLabel>Select diagnosis*</InputLabel>
                            <Select {...field} label="Select diagnosis*" sx={{ ...formSelectSx }}>
                                {diagnosesLoading ? (
                                <MenuItem disabled>
                                    <CircularProgress size={20} />
                                </MenuItem>
                                ) : (
                                diagnosesData?.items.map((diagnosis) => (
                                    <MenuItem key={diagnosis.id} value={diagnosis.id}>
                                    {diagnosis.title || diagnosis.name}
                                    </MenuItem>
                                ))
                                )}
                            </Select>
                            {errors.diagnosis && (
                                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                                {errors.diagnosis.message}
                                </Typography>
                            )}
                            </FormControl>
                        )}
                        />

                        <Controller
                        name="dischargeDate"
                        control={control}
                        render={({ field }) => (
                            <TextField
                            {...field}
                            sx={{ ...formTextFieldSx }}
                            label="Enter discharge date*"
                            type="date"
                            slotProps={{
                                inputLabel: { shrink: true }
                            }}
                            error={!!errors.dischargeDate}
                            helperText={errors.dischargeDate?.message}
                            fullWidth
                            />
                        )}
                        />

                        <Controller
                        name="veteranStatus"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth error={!!errors.veteranStatus} disabled={veteranStatusesLoading}>
                            <InputLabel>Veteran status*</InputLabel>
                            <Select {...field} label="Veteran status*" sx={{ ...formSelectSx }}>
                                {veteranStatusesLoading ? (
                                <MenuItem disabled>
                                    <CircularProgress size={20} />
                                </MenuItem>
                                ) : (
                                veteranStatusesData?.items.map((status) => (
                                    <MenuItem key={status.id} value={status.id}>
                                    {status.title || status.name}
                                    </MenuItem>
                                ))
                                )}
                            </Select>
                            {errors.veteranStatus && (
                                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                                {errors.veteranStatus.message}
                                </Typography>
                            )}
                            </FormControl>
                        )}
                        />
                    </Box>
                </Box>

                <Box sx={{ ...formSectionSx }}>
                    {/* Section 2: Additional Information */}
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>
                        Additional information
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2  }}>
                        <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <TextField
                            {...field}
                            sx={{ ...formTextFieldSx }}
                            label="Enter email"
                            type="email"
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            fullWidth
                            />
                        )}
                        />

                        <Controller
                        name="branchLocation"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth error={!!errors.branchLocation} disabled={branchesLoading}>
                            <InputLabel>Branch location*</InputLabel>
                            <Select {...field} label="Branch location*" sx={{ ...formSelectSx }}>
                                {branchesLoading ? (
                                <MenuItem disabled>
                                    <CircularProgress size={20} />
                                </MenuItem>
                                ) : (
                                branchesData?.items.map((branch) => (
                                    <MenuItem key={branch.id} value={branch.id}>
                                    {branch.title || branch.name}
                                    </MenuItem>
                                ))
                                )}
                            </Select>
                            {errors.branchLocation && (
                                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                                {errors.branchLocation.message}
                                </Typography>
                            )}
                            </FormControl>
                        )}
                        />

                        <Controller
                        name="payerType"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth error={!!errors.payerType} disabled={payerTypesLoading}>
                            <InputLabel>Select payer type*</InputLabel>
                            <Select {...field} label="Select payer type*" sx={{ ...formSelectSx }}>
                                {payerTypesLoading ? (
                                <MenuItem disabled>
                                    <CircularProgress size={20} />
                                </MenuItem>
                                ) : (
                                payerTypesData?.items.map((payer) => (
                                    <MenuItem key={payer.id} value={payer.id}>
                                    {payer.title || payer.name}
                                    </MenuItem>
                                ))
                                )}
                            </Select>
                            {errors.payerType && (
                                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                                {errors.payerType.message}
                                </Typography>
                            )}
                            </FormControl>
                        )}
                        />

                        <Controller
                        name="referralSource"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth>
                            <InputLabel>Select referral source</InputLabel>
                            <Select {...field} label="Select referral source" sx={{ ...formSelectSx }}>
                                <MenuItem value="Hospital">Hospital</MenuItem>
                                <MenuItem value="Physician">Physician</MenuItem>
                                <MenuItem value="Self-Referral">Self-Referral</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                            </FormControl>
                        )}
                        />
                    </Box>
                </Box>

                <Box sx={{ ...formSectionSx }}>
                    {/* Section 3: Contact Method */}
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>
                        Contact Method*
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Controller
                        name="contactPriority"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth error={!!errors.contactPriority} disabled={contactMethodsLoading}>
                            <InputLabel>Contact Method*</InputLabel>
                            <Select {...field} label="Contact Method*" sx={{ ...formSelectSx }}>
                                {contactMethodsLoading ? (
                                <MenuItem disabled>
                                    <CircularProgress size={20} />
                                </MenuItem>
                                ) : (
                                contactMethodsData?.items.map((method) => (
                                    <MenuItem key={method.id} value={method.id}>
                                    {method.title || method.name}
                                    </MenuItem>
                                ))
                                )}
                            </Select>
                            {errors.contactPriority && (
                                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                                {errors.contactPriority.message}
                                </Typography>
                            )}
                            </FormControl>
                        )}
                        />
                    </Box>
                </Box>

                <Box sx={{ ...formSectionSx }}>
                    {/* Section 4: No1 Alternative Contact */}
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>
                        №1 Alternative Contact*
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Controller
                        name="altContact1FullName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                            {...field}
                            sx={{ ...formTextFieldSx }}
                            label="Enter full name*"
                            error={!!errors.altContact1FullName}
                            helperText={errors.altContact1FullName?.message}
                            fullWidth
                            />
                        )}
                        />

                        <Controller
                        name="altContact1Phone"
                        control={control}
                        render={({ field }) => (
                            <TextField
                            {...field}
                            sx={{ ...formTextFieldSx }}
                            label="+1 (555) 000-0000*"
                            error={!!errors.altContact1Phone}
                            helperText={errors.altContact1Phone?.message}
                            fullWidth
                            />
                        )}
                        />

                        <Controller
                        name="altContact1Relationship"
                        control={control}
                        render={({ field }) => (
                            <TextField
                            {...field}
                            sx={{ ...formTextFieldSx }}
                            label="Enter relationship*"
                            error={!!errors.altContact1Relationship}
                            helperText={errors.altContact1Relationship?.message}
                            fullWidth
                            />
                        )}
                        />

                        <Controller
                        name="altContact1Email"
                        control={control}
                        render={({ field }) => (
                            <TextField
                            {...field}
                            sx={{ ...formTextFieldSx }}
                            label="Email"
                            type="email"
                            error={!!errors.altContact1Email}
                            helperText={errors.altContact1Email?.message}
                            fullWidth
                            />
                        )}
                        />

                        <Controller
                        name="altContact1MainPOC"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                            control={
                                <Checkbox {...field} checked={field.value} sx={{
                                  '& .MuiSvgIcon-root': {
                                    color: '#716beeff',
                                  },
                                }}
                                />
                            }
                            label="Mark as main point of contact"
                            />
                        )}
                        />
                    </Box>
                </Box>

                <Box sx={{ ...formSectionSx }}>
                    {/* Section 5: No2 Alternative Contact */}
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>
                        №2 Alternative Contact
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2  }}>
                        <Controller
                        name="altContact2FullName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                            {...field}
                            sx={{ ...formTextFieldSx }}
                            label="Enter full name"
                            error={!!errors.altContact2FullName}
                            helperText={errors.altContact2FullName?.message}
                            fullWidth
                            />
                        )}
                        />

                        <Controller
                        name="altContact2Phone"
                        control={control}
                        render={({ field }) => (
                            <TextField
                            {...field}
                            sx={{ ...formTextFieldSx }}
                            label="+1 (555) 000-0000"
                            error={!!errors.altContact2Phone}
                            helperText={errors.altContact2Phone?.message}
                            fullWidth
                            />
                        )}
                        />

                        <Controller
                        name="altContact2Relationship"
                        control={control}
                        render={({ field }) => (
                            <TextField
                            {...field}
                            sx={{ ...formTextFieldSx }}
                            label="Enter relationship"
                            error={!!errors.altContact2Relationship}
                            helperText={errors.altContact2Relationship?.message}
                            fullWidth
                            />
                        )}
                        />

                        <Controller
                        name="altContact2Email"
                        control={control}
                        render={({ field }) => (
                            <TextField
                            {...field}
                            sx={{ ...formTextFieldSx }}
                            label="Email"
                            type="email"
                            error={!!errors.altContact2Email}
                            helperText={errors.altContact2Email?.message}
                            fullWidth
                            />
                        )}
                        />

                        <Controller
                        name="altContact2MainPOC"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={<Checkbox {...field} checked={field.value} sx={{
                                  '& .MuiSvgIcon-root': {
                                    color: '#716beeff',
                                  },
                                }} />}
                                label="Mark as main point of contact"
                            />
                        )}
                        />
                    </Box>
                </Box>
            </Box>
        </form>
    </Box>
  );
}
