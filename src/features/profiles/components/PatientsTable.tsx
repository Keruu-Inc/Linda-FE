import { Box, IconButton, Badge, Button, Tooltip, Chip } from "@mui/material";
import { ArticleOutlined as ArticleOutlinedIcon } from "@mui/icons-material";
import type { Patient } from "../types";
import { formatDate } from "../../../utils/date";
import { formatProfileId } from "../../../utils/formatters";
import { DataTable, type Column } from "../../../components/ui/DataTable";
import styles from "./PatientsTable.module.css";
import { PatientStatusBadge } from "./PatientStatusBadge";
import { PatientActionsMenu } from "./PatientActionsMenu";

interface PatientsTableProps {
  patients: Patient[];
  hasMore?: boolean;
  onPatientClick?: (patientId: string) => void;
  onActionClick?: (patientId: string, action: string, reason?: string) => void;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
}

export function PatientsTable({
  patients,
  hasMore = false,
  onPatientClick,
  onActionClick,
  onLoadMore,
  isLoadingMore = false,
}: PatientsTableProps) {
  const formatCallDate = (date: string | null) => {
    if (!date) return "-";
    try {
      const dateStr = formatDate(date, "MM/dd/yyyy");
      const timeStr = formatDate(date, "hh:mm:ss a");
      return (
        <Box sx={{ display: "flex", flexDirection: "column", lineHeight: 1.4 }}>
          <span>{dateStr}</span>
          <span style={{ fontSize: "13px" }}>({timeStr})</span>
        </Box>
      );
    } catch {
      return date;
    }
  };

  const formatUpcomingCall = (date: string | null, days: number | null) => {
    if (!date) return "-";
    try {
      const formattedDate = formatDate(date, "MM/dd/yyyy");
      return (
        <Box sx={{ display: "flex", flexDirection: "column", lineHeight: 1.4 }}>
          <span>{formattedDate}</span>
          {days !== null && (
            <span style={{ fontSize: "13px" }}>({days} Days)</span>
          )}
        </Box>
      );
    } catch {
      return date;
    }
  };

  const columns: Column<Patient>[] = [
    {
      id: "id",
      label: "ID",
      width: 70,
      align: "left",
      render: (patient) => formatProfileId(patient.id),
    },
    {
      id: "patientName",
      label: "Profile Name",
      width: 150,
      align: "left",
      render: (patient) => (
        <span style={{ fontWeight: 500 }}>{patient.patientName}</span>
      ),
    },
    {
      id: "daysSinceDischarge",
      label: "Days Since Discharge",
      width: 120,
      align: "center",
      render: (patient) => `${patient.daysSinceDischarge} days`,
    },
    {
      id: "lastCall",
      label: "Last Call",
      width: 130,
      align: "left",
      render: (patient) => formatCallDate(patient.lastCall),
    },
    {
      id: "upcomingCall",
      label: "Upcoming Call",
      width: 130,
      align: "left",
      render: (patient) =>
        formatUpcomingCall(patient.upcomingCall, patient.upcomingCallDays),
    },
    {
      id: "payerType",
      label: "Payer Type",
      width: 90,
      align: "left",
    },
    {
      id: "alerts",
      label: "Alert(s)",
      width: 150,
      align: "center",
      render: (patient) => {
        if (patient.alerts.length === 0) {
          return <span style={{ color: "#7f889a" }}>-</span>;
        }

        const firstAlert = patient.alerts[0];
        const remainingCount = patient.alerts.length - 1;

        if (patient.alerts.length === 1) {
          return (
            <PatientStatusBadge 
              alert={firstAlert}
            />
          );
        }

        return (
          <Box
            sx={{
              display: "flex",
              gap: 0.5,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <PatientStatusBadge alert={firstAlert} />
            <Tooltip
              title={
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, alignItems: "flex-start" }}>
                  {patient.alerts.slice(1).map((alert, index) => (
                    <PatientStatusBadge 
                      key={index} 
                      alert={alert}
                    />
                  ))}
                </Box>
              }
              componentsProps={{
                tooltip: {
                  sx: {
                    backgroundColor: "#fff",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    borderRadius: "8px",
                    padding: "8px",
                    maxWidth: "none",
                  },
                },
              }}
            >
              <Chip
                label={`+${remainingCount}`}
                size="small"
                sx={{
                  height: "20px",
                  fontSize: "11px",
                  fontWeight: 500,
                  cursor: "pointer",
                  backgroundColor: "#e8eaf0",
                  color: "#4a5568",
                  "&:hover": {
                    backgroundColor: "#d1d5db",
                  },
                }}
              />
            </Tooltip>
          </Box>
        );
      },
    },
    {
      id: "report",
      label: "Report",
      width: 70,
      align: "center",
      render: (patient) => (
        <IconButton
          size="small"
          className={styles.reportButton}
          onClick={(e) => {
            e.stopPropagation();
            onActionClick?.(patient.id, "view-report");
          }}
        >
          <Badge badgeContent={patient.reportNotificationCount} color="error">
            <ArticleOutlinedIcon fontSize="small" className={styles.reportIcon} />
          </Badge>
        </IconButton>
      ),
    },
    {
      id: "actions",
      label: "Actions",
      width: 70,
      align: "center",
      render: (patient) => (
        <div onClick={(e) => e.stopPropagation()}>
          <PatientActionsMenu
            patientId={patient.id}
            onActionClick={onActionClick || (() => {})}
          />
        </div>
      ),
    },
  ];

  return (
    <Box>
      <DataTable
        columns={columns}
        rows={patients}
        getRowId={(patient) => patient.id}
        onRowClick={(patient) => onPatientClick?.(patient.id)}
      />
      {hasMore && (
        <Box className={styles.loadMoreContainer}>
          <Button
            variant="outlined"
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className={styles.loadMoreButton}
          >
            {isLoadingMore ? "Loading..." : "Load More"}
          </Button>
        </Box>
      )}
    </Box>
  );
}
