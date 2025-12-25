export type PatientStatus = "discharged" | "re-certified" | "archived";

export type PayerType = "Medicare Traditional" | "Medicare Advance" | "Private" | "Undefined" | "Insurance" | "Paying for themselves";

export type AlertType =
  | "Re-Cert"
  | "Low NPS Score"
  | "Failed Sequence"
  | "Adv. Sympt"
  | "Adv. Symptoms"
  | "Low NPS";

export interface Alert {
  type: AlertType;
  severity: "low" | "medium" | "high";
}

export interface Patient {
  id: string;
  patientName: string;
  dischargeDate: string;
  daysSinceDischarge: number;
  lastCall: string | null;
  upcomingCall: string | null;
  upcomingCallDays: number | null;
  payerType: PayerType;
  alerts: Alert[];
  hasReport: boolean;
  reportNotificationCount?: number;
  reCertifiedDate?: string;
  reason?: string;
}

export interface PatientsTableProps {
  patients: Patient[];
  onPatientClick?: (patientId: string) => void;
  onActionClick?: (patientId: string, action: string, reason?: string) => void;
}

export interface ApiPatientResponse {
  items: ApiPatient[];
  hasMore: boolean;
}

export interface ApiPatient {
  id: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  state: {
    name: string;
    isDischarged: boolean;
    isRecertified: boolean;
  };
  dischargeDateAtUtc: string;
  payerType: {
    name: string;
  };
  stateNote?: string;
}


export interface Report {
  id: string;
  date: string;
  time: string;
  callingProgram: string;
  status: "Completed" | "Partial";
  hasNotification?: boolean;
}

export interface Log {
  id: string;
  date: string;
  time: string;
  actionType: string;
  description: string;
  attempt: string;
  result: string;
  performedBy: string;
}

export interface Intervention {
  id: string;
  date: string;
  time: string;
  callingProgram: string;
  type: string;
  description: string;
  requiredInfo: string;
  reportIssue: string;
  hasNotification?: boolean;
}
