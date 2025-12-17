import type { Patient, ApiPatient, Alert, AlertType } from "../types";
import { daysSinceDischarged } from "../../../utils/date";
import { subDays, addDays, formatISO, parseISO } from "date-fns";

function randomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function daysBetween(date1: Date, date2: Date): number {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function generateRandomAlerts(): Alert[] {
  const alertTypes: AlertType[] = [
    "Re-Cert",
    "Low NPS Score",
    "Failed Sequence",
    "Adv. Sympt",
    "Adv. Symptoms",
    "Low NPS",
  ];
  const severities: Alert["severity"][] = ["low", "medium", "high"];

  if (Math.random() > 0.7) {
    return [];
  }

  const numAlerts = Math.floor(Math.random() * 3) + 1;
  const alerts: Alert[] = [];

  for (let i = 0; i < numAlerts; i++) {
    const randomType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    const randomSeverity = severities[Math.floor(Math.random() * severities.length)];
    
    if (!alerts.some((alert) => alert.type === randomType)) {
      alerts.push({
        type: randomType,
        severity: randomSeverity,
      });
    }
  }

  return alerts;
}

export function mapPatientToPatient(patient: ApiPatient): Patient {
  const patientName = [patient.firstName, patient.middleName, patient.lastName]
    .filter(Boolean)
    .join(" ");

  const dischargeDate = patient.dischargeDateAtUtc;
  const daysSinceDischarge = daysSinceDischarged(dischargeDate);

  const payerTypeMap: Record<string, Patient["payerType"]> = {
    "Medicare Traditional": "Medicare Traditional",
    "Medicare Advance": "Medicare Advance",
    Private: "Private",
    Undefined: "Private",
    Insurance: "Private",
    "Paying for themselves": "Private",
  };

  const payerType = payerTypeMap[patient.payerType.name] || "Private";

  const now = new Date();
  const lastCallDate = randomDate(subDays(now, 30), now);
  const lastCall = formatISO(lastCallDate);

  const upcomingCallDate = randomDate(now, addDays(now, 60));
  const upcomingCall = formatISO(upcomingCallDate);
  const upcomingCallDays = daysBetween(now, upcomingCallDate);

  // Generate random re-certified date if patient is re-certified
  const reCertifiedDate = patient.state.isRecertified
    ? formatISO(randomDate(parseISO(dischargeDate), now))
    : undefined;

  // Use stateNote as reason, or generate a random reason
  const reasons = [
    "Medical necessity",
    "Patient request",
    "Clinical improvement",
    "Treatment continuation",
  ];
  const reason = patient.stateNote || 
    (patient.state.isRecertified 
      ? reasons[Math.floor(Math.random() * reasons.length)]
      : undefined);

  return {
    id: patient.id,
    patientName,
    dischargeDate,
    daysSinceDischarge,
    lastCall,
    upcomingCall,
    upcomingCallDays,
    payerType,
    alerts: generateRandomAlerts(),
    hasReport: false,
    reportNotificationCount: undefined,
    reCertifiedDate,
    reason,
  };
}
