import { differenceInDays, format, parseISO } from 'date-fns';

export function daysSinceDischarged(dischargeDate: Date | string): number {
  const date =
    typeof dischargeDate === 'string' ? parseISO(dischargeDate) : dischargeDate;
  return differenceInDays(new Date(), date);
}/*  */

export function formatDate(
  date: Date | string,
  formatStr: string = 'MMM dd, yyyy'
): string {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatStr);
  } catch {
    return typeof date === 'string' ? date : date.toISOString();
  }
}
