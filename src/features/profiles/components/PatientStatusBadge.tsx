import { Chip } from '@mui/material';

interface AlertBadgeProps {
  alert: {
    type: string;
    severity: 'low' | 'medium' | 'high';
  };
  fullWidth?: boolean;
}

const alertColors: Record<string, { bg: string; color: string }> = {
  'Re-Cert': { bg: '#fff3e0', color: '#e65100' },
  'Low NPS Score': { bg: '#f3e5f5', color: '#6a1b9a' },
  'Low NPS': { bg: '#f3e5f5', color: '#6a1b9a' },
  'Failed Sequence': { bg: '#ffebee', color: '#c62828' },
  'Adv. Sympt': { bg: '#fff3e0', color: '#e65100' },
  'Adv. Symptoms': { bg: '#fff3e0', color: '#e65100' },
};

export function PatientStatusBadge({ alert, fullWidth = false }: AlertBadgeProps) {
  const colors = alertColors[alert.type] || { bg: '#f5f5f5', color: '#666' };

  return (
    <Chip
      label={
        <span>
          <span style={{ color: colors.color, fontSize: '2.5em', lineHeight: 1, verticalAlign: 'middle', display: 'inline-block' }}>•</span>{' '}
          <span style={{ color: '#33333F', verticalAlign: 'middle' }}>{alert.type}</span>
        </span>
      }
      size="small"
      sx={{
        bgcolor: colors.bg,
        fontWeight: 500,
        fontSize: '0.75rem',
        height: 36,
        mr: 0.5,
        width: fullWidth ? '100%' : 'auto',
        justifyContent: fullWidth ? 'flex-start' : 'center',
      }}
    />
  );
}
