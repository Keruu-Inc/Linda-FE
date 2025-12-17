import type { CreatePatientRequest } from '../services/patientService';

export interface AddProfileFormData {
  fullName: string;
  gender: string;
  dateOfBirth: string;
  homeAddress: string;
  phone: string;
  diagnosis: string;
  dischargeDate: string;
  veteranStatus: string;
  email: string;
  branchLocation: string;
  payerType: string;
  referralSource?: string;
  contactPriority: string;
  altContact1FullName: string;
  altContact1Phone: string;
  altContact1Relationship: string;
  altContact1Email: string;
  altContact1MainPOC: boolean;
  altContact2FullName?: string;
  altContact2Phone?: string;
  altContact2Relationship?: string;
  altContact2Email?: string;
  altContact2MainPOC: boolean;
}

/**
 * Parses a full name into first, middle, and last name components
 */
function parseFullName(fullName: string): { firstName: string; middleName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/);
  
  if (parts.length === 1) {
    return { firstName: parts[0], middleName: '', lastName: parts[0] };
  } else if (parts.length === 2) {
    return { firstName: parts[0], middleName: '', lastName: parts[1] };
  } else {
    return {
      firstName: parts[0],
      middleName: parts.slice(1, -1).join(' '),
      lastName: parts[parts.length - 1],
    };
  }
}

/**
 * Parses a home address into address components
 * Expected format: "123 Main St, New York, NY 10001"
 * Or: "123 Main St"
 */
function parseAddress(homeAddress: string): {
  addressLine1: string;
  addressCity: string;
  addressState: string;
  addressZipCode: string;
} {
  const parts = homeAddress.split(',').map(p => p.trim());
  
  if (parts.length >= 3) {
    // Full format: "123 Main St, New York, NY 10001"
    const lastPart = parts[parts.length - 1];
    const stateZipMatch = lastPart.match(/^([A-Z]{2})\s+(\d{5}(?:-\d{4})?)$/);
    
    if (stateZipMatch) {
      return {
        addressLine1: parts[0],
        addressCity: parts[parts.length - 2],
        addressState: stateZipMatch[1],
        addressZipCode: stateZipMatch[2],
      };
    }
  }
  
  // Fallback: use the whole address as addressLine1
  return {
    addressLine1: homeAddress,
    addressCity: 'N/A',
    addressState: 'N/A',
    addressZipCode: '00000',
  };
}

/**
 * Transforms form data to the API request format
 */
export function transformFormDataToPatientRequest(
  formData: AddProfileFormData,
  defaultStatusId: string
): CreatePatientRequest {
  const { firstName, middleName, lastName } = parseFullName(formData.fullName);
  const { addressLine1, addressCity, addressState, addressZipCode } = parseAddress(formData.homeAddress);

  return {
    firstName,
    middleName: middleName || 'N/A',
    lastName,
    genderId: formData.gender,
    dateOfBirth: new Date(formData.dateOfBirth).toISOString(),
    statusId: defaultStatusId,
    diagnosisId: formData.diagnosis,
    veteranStatusId: formData.veteranStatus,
    branchId: formData.branchLocation,
    contactMethodId: formData.contactPriority,
    addressLine1,
    addressLine2: undefined,
    addressCity,
    addressState,
    addressZipCode,
    phoneNumber: formData.phone,
    email: formData.email || undefined,
    dischargeDateAtUtc: formData.dischargeDate ? new Date(formData.dischargeDate).toISOString() : undefined,
    primaryPhysicianName: 'N/A', // Not in form, using default
    accountExecutiveName: 'N/A', // Not in form, using default
    referralName: formData.referralSource || 'N/A',
    referralDateAtUtc: new Date().toISOString(), // Using current date as default
    payerTypeId: formData.payerType,
  };
}
