import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  IconButton,
  Chip,
  Badge,
  Tooltip
} from "@mui/material";
import {
  ContentCopy,
  PersonOutline,
  ArticleOutlined as ArticleOutlinedIcon,
  Error,
  ArrowBackIosNew,
  PhoneOutlined,

} from "@mui/icons-material";
//components
import { TabsComponent, type TabItem } from "@/components/ui/TabsComponent";
import styles from "./ProfilePage.module.css";
import { PatientStatusBadge } from "../components/PatientStatusBadge";
import InterventionTab from "../components/tabs/InterventionTab";
import LogsTab from "../components/tabs/LogsTab";
import ReportsTab from "../components/tabs/ReportsTab";
import { handleCopy } from "@/utils/helpers";
//data & types
import type { Report, Log, Intervention } from "../types";
import { type Column } from '@/components/ui/DataTable';
import { mockReports } from "../mocks/reports.mock";
import {
  logs14DaysMock,
  logs30DaysMock,
  logs60DaysMock,
} from '../mocks/logs.mock';

import {
  pendingInterventionsMock,
  completedInterventionsMock,
  notRelevantInterventionsMock,
} from '../mocks/interventions.mock';
import { SelectInput } from "@/components/inputs/SelectInput";
import { InterventionActionsMenu } from "../components/InterventionActionsMenu";

const reportColumns: Column<Report>[] = [
  {
    id: "date",
    label: "Date",
    width: 120,
    align: "left",
  },
  {
    id: "time",
    label: "Time",
    width: 100,
    align: "left",
  },
  {
    id: "callingProgram",
    label: "Calling Program",
    width: 200,
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    width: 120,
    align: "left",
    render: (report) => <PatientStatusBadge alert={{ type: report.status, severity: "low" }} />,
  },
  {
    id: "report",
    label: "Report",
    width: 80,
    align: "right",
    render: (report) => (
      <IconButton
        size="small"
        className={styles.reportButton}
        onClick={(e) => {
          e.stopPropagation();
          console.log('report', report)
        }}
      >
        {report.hasNotification ?
          <Badge
            badgeContent={'!'}
            color="error"
            sx={{
              '& .MuiBadge-badge': {
                fontSize: '10px',
                height: 16,
                minWidth: 16,
                padding: '0 4px',
              },
            }}
          >
            <ArticleOutlinedIcon fontSize="small" className={styles.reportIcon} />
          </Badge>
          : <ArticleOutlinedIcon fontSize="small" className={styles.reportIcon} />
        }

      </IconButton>
    ),
  },
];

const logsColumns: Column<Log>[] = [
  {
    id: "date",
    label: "Date",
    width: 120,
    align: "left",
  },
  {
    id: "time",
    label: "Time",
    width: 100,
    align: "left",
  },
  {
    id: "actionType",
    label: "Action Type",
    width: 200,
    align: "left",
  },
  {
    id: "description",
    label: "Description",
    width: 200,
    align: "left",
  },
  {
    id: "attempt",
    label: "Attempt #",
    width: 100,
    align: "left",
  },
  {
    id: "result",
    label: "Result",
    width: 150,
    align: "left",
  },
  {
    id: "performedBy",
    label: "Performed By",
    width: 150,
    align: "left",
  },

];

const interventionsColumns: Column<Intervention>[] = [
  {
    id: "date",
    label: "Date",
    width: 120,
    align: "left",
  },
  {
    id: "time",
    label: "Time",
    width: 100,
    align: "left",
  },
  {
    id: "callingProgram",
    label: "Calling Program",
    width: 100,
    align: "left",
  },
  {
    id: "type",
    label: "Type",
    width: 100,
    align: "left",
    render: (intervention) => <PatientStatusBadge alert={{ type: intervention.type, severity: "low" }} isIntervention={true} />,
  },
  {
    id: "description",
    label: "Description",
    width: 200,
    align: "left",
  },
  {
    id: "requiredInfo",
    label: "Required Info",
    width: 150,
    align: "left",
    render: (intervention) => {
      const value = intervention.requiredInfo;

      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Typography
            variant="body2"
            noWrap
            sx={{ maxWidth: 120 }}
          >
            {value || "—"}
          </Typography>

          {value && value !== '—' && (
            <Tooltip title="Copy">
              <IconButton
                size="small"
                onClick={() => handleCopy(value)}
                sx={{
                  width: 24,
                  height: 24,
                }}
              >
                <ContentCopy fontSize="inherit" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      );
    },
  },
  {
    id: "reportIssue",
    label: "Report Issue",
    width: 150,
    align: "left",
  },
  {
    id: "report",
    label: "Report",
    width: 80,
    align: "right",
    render: (report) => (
      <IconButton
        size="small"
        className={styles.reportButton}
        onClick={(e) => {
          e.stopPropagation();
          console.log('report', report)
        }}
      >
        {report.hasNotification ?
          <Badge
            badgeContent={'!'}
            color="error"
            sx={{
              '& .MuiBadge-badge': {
                fontSize: '10px',
                height: 16,
                minWidth: 16,
                padding: '0 4px',
              },
            }}
          >
            <ArticleOutlinedIcon fontSize="small" className={styles.reportIcon} />
          </Badge>
          : <ArticleOutlinedIcon fontSize="small" className={styles.reportIcon} />
        }

      </IconButton>
    ),
  },
  {
    id: "action",
    label: "Actions",
    width: 80,
    align: "right",
    render: () => (
      <div onClick={(e) => e.stopPropagation()}>
        <InterventionActionsMenu
          onActionClick={(action) => console.log("Intervention action:", action)}
        />
      </div>
    ),
  },

];

export type ProfileTabValue = "personal" | "reports" | "logs" | "interventions";

export type LogTabValue = "14Days" | "30Days" | "60Days";

export type InterventionTabValue = "pending" | "completed" | "notRelevant";

const logsByTab: Record<LogTabValue, Log[]> = {
  '14Days': logs14DaysMock,
  '30Days': logs30DaysMock,
  '60Days': logs60DaysMock,
};

const interventionsByTab: Record<InterventionTabValue, Intervention[]> = {
  'pending': pendingInterventionsMock,
  'completed': completedInterventionsMock,
  'notRelevant': notRelevantInterventionsMock,
};

const logTabs: TabItem[] = [
  { value: "14Days", label: "Post-Discharge 14 Days" },
  { value: "30Days", label: "Post-Discharge 30 Days" },
  { value: "60Days", label: "Post-Discharge 60 Days" },
];

const interventionTabs: TabItem[] = [
  { value: "pending", label: "Pending Interventions" },
  { value: "completed", label: "Completed" },
  { value: "notRelevant", label: "Not Relevant" },
];

const profileTabs: TabItem[] = [
  { value: "personal", label: "Personal information" },
  { value: "reports", label: "Reports" },
  { value: "logs", label: "Logs" },
  { value: "interventions", label: "Manual Interventions" },
];

export function ProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ProfileTabValue>("personal");
  const [profileStatus, setProfileStatus] = useState("active");
  const [activeLogTab, setActiveLogTab] = useState<LogTabValue>("14Days");
  const [activeInterventionTab, setActiveInterventionTab] = useState<InterventionTabValue>("pending");

  const logs = logsByTab[activeLogTab];
  const interventions = interventionsByTab[activeInterventionTab];



  return (
    <Container maxWidth={false} className={styles.contentContainer}>
      {/* Header Section */}
      <Box className={styles.headerSection}>
        <Box className={styles.headerLeft}>
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              backgroundColor: "#fff",
              color: "#33333f",
              border: "1px solid #edf0f6",
              width: 48,
              height: 48,
              padding: 1,
              "&:hover": {
                backgroundColor: "#f4f7fd",
              },
              mr: 1,
            }}
          >
            <ArrowBackIosNew sx={{ fontSize: 18 }} />
          </IconButton>
          <Typography variant="h5" className={styles.headerTitle}>
            Profile
          </Typography>
        </Box>
        <Box className={styles.upcomingSection}>
          <Box sx={{ display: 'flex' }}>
            <PhoneOutlined sx={{ fontSize: 20, color: "#7F889A", mr: 0.5 }} />
            <Typography variant="body2" className={styles.upcomingLabel}>
              Upcoming:
            </Typography>
          </Box>
          <Chip label="Post-Discharge 14 Days" size="small" className={styles.upcomingChip} />
          <Chip label="Call Attempt 2/4" size="small" className={styles.upcomingChip} />
          <Chip
            label="Martina Gonzalez (alt contact)"
            size="small"
            className={styles.upcomingChip}
          />
          <Chip label="8:00AM" size="small" className={styles.upcomingChip} />
          <Chip label="12/15/2025" size="small" className={styles.upcomingChip} />
        </Box>
      </Box>
      <Box className={styles.userInfoContainer}>
        {/* User Information Section */}
        <Box className={styles.userInfoSection}>
          <Box className={styles.userInfoLeft}>
            <Box className={styles.userIdSection}>
              <Typography variant="body2" className={styles.userIdLabel}>
                User: I.D.
              </Typography>
              <Chip
                label="CS001"
                size="small"
                icon={<ContentCopy sx={{ fontSize: "14px !important" }} />}
                onClick={() => handleCopy("CS001")}
                className={styles.userIdChip}
                sx={{
                  bgcolor: "#f4f7fd",
                  color: "#33333f",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  height: 32,
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: "#e8ecf5",
                  },
                }}
              />
            </Box>
            <Typography variant="body2" className={styles.dischargeDate}>
              Discharge Date: 30/17/25 (Day: 30)
            </Typography>
            <Chip
              label="Manual Intervention Needed"
              size="small"
              sx={{
                bgcolor: "#fe9b38",
                color: "#fff",
                fontWeight: 500,
                fontSize: "0.75rem",
                height: 32
              }}
            />
          </Box>
          <SelectInput
            label="Profile Status:"
            value={profileStatus}
            onChange={setProfileStatus}
            icon={<PersonOutline sx={{ fontSize: "24px", color: "#7F889A", mr: '1px' }} />}
            options={[
              { value: "active", label: "Active" },
              { value: "reCertified", label: "Re-Certified" },
              { value: "dissmissed", label: "Dismissed/Archived" },
            ]}
          />
        </Box>

        {/* Navigation Tabs */}
        <Box className={styles.tabsSection}>
          <TabsComponent
            simple
            tabs={profileTabs}
            value={activeTab}
            onChange={(newValue) => setActiveTab(newValue as ProfileTabValue)}
            tabsClassName={styles.profileTabs}
            hideIndicator={false}
          />
          <Error
            sx={{ fontSize: 18, color: "#FE9B38", ml: 1 }}
          />
        </Box>

        {/* Content Section */}
        <Box className={styles.contentSection}>
          {activeTab === "reports" && (
            <ReportsTab
              columns={reportColumns}
              rows={mockReports}
            />
          )}
          {activeTab === "personal" && (
            <Typography variant="h6" className={styles.placeholderText}>
              Personal Information Tab Content
            </Typography>
          )}
          {activeTab === "logs" && (
            <LogsTab
              rows={logs}
              columns={logsColumns}
              logTabs={logTabs}
              activeLogTab={activeLogTab}
              setActiveLogTab={setActiveLogTab}
            />
          )}
          {activeTab === "interventions" && (
            <Typography variant="h6" className={styles.placeholderText}>
              Interventions
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}
