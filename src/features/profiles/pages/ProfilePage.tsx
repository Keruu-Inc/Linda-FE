import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  IconButton,
  Chip,
  Select,
  MenuItem,
  FormControl,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  ContentCopy,
  PersonOutline,
  ExpandMore,
  Description,
  WarningAmber,
  ArrowBackIosNew,
} from "@mui/icons-material";
import { TabsComponent, type TabItem } from "../../../components/ui/TabsComponent";
import styles from "./ProfilePage.module.css";

type ProfileTabValue = "personal" | "reports" | "logs" | "interventions";

interface Report {
  id: string;
  date: string;
  time: string;
  callingProgram: string;
  status: "completed" | "partial";
  hasNotification?: boolean;
}

const mockReports: Report[] = [
  {
    id: "1",
    date: "2025-10-15",
    time: "15:05:45",
    callingProgram: "Post Discharge Day 14",
    status: "completed",
  },
  {
    id: "2",
    date: "2025-10-15",
    time: "15:11:45",
    callingProgram: "Post Discharge Day 30",
    status: "partial",
    hasNotification: true,
  },
  {
    id: "3",
    date: "2025-10-15",
    time: "15:12:30",
    callingProgram: "Post Discharge Day 60",
    status: "completed",
  },
];

const profileTabs: TabItem[] = [
  { value: "personal", label: "Personal information" },
  { value: "reports", label: "Reports" },
  { value: "logs", label: "Logs" },
  { value: "interventions", label: "Manual Interventions" },
];

export function ProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ProfileTabValue>("reports");
  const [profileStatus, setProfileStatus] = useState("active");

  const handleCopyId = () => {
    navigator.clipboard.writeText("CS001");
  };

  const getStatusBadge = (status: "completed" | "partial") => {
    if (status === "completed") {
      return (
        <Chip
          label={
            <span>
              <span style={{ color: "#4caf50", fontSize: "0.75em", marginRight: "4px" }}>
                •
              </span>
              Completed
            </span>
          }
          size="small"
          sx={{
            bgcolor: "#e8f5e9",
            color: "#33333f",
            fontWeight: 500,
            fontSize: "0.75rem",
            height: 28,
          }}
        />
      );
    } else {
      return (
        <Chip
          label={
            <span>
              <span style={{ color: "#ffc107", fontSize: "0.75em", marginRight: "4px" }}>
                •
              </span>
              Partial
            </span>
          }
          size="small"
          sx={{
            bgcolor: "#fff9c4",
            color: "#33333f",
            fontWeight: 500,
            fontSize: "0.75rem",
            height: 28,
          }}
        />
      );
    }
  };

  return (
    <Container maxWidth={false} className={styles.contentContainer}>
      {/* Header Section */}
      <Box className={styles.headerSection}>
        <Box className={styles.headerLeft}>
          <IconButton
            onClick={() => navigate(-1)}
            className={styles.backButton}
            sx={{ mr: 1 }}
          >
            <ArrowBackIosNew sx={{ fontSize: "16px !important" }} />
          </IconButton>
          <Typography variant="h6" className={styles.headerTitle}>
            Profile
          </Typography>
        </Box>
        <Box className={styles.upcomingSection}>
          <Typography variant="body2" className={styles.upcomingLabel}>
            Upcoming:
          </Typography>
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
                    onClick={handleCopyId}
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
                <Box className={styles.profileStatusSection}>
                <PersonOutline sx={{ fontSize: 20, color: "#7f889a", mr: 0.5 }} />
                <Typography variant="body2" className={styles.profileStatusLabel}>
                    Profile Status:
                </Typography>
                <FormControl size="small" sx={{ minWidth: 100, ml: 1 }}>
                    <Select
                    value={profileStatus}
                    onChange={(e) => setProfileStatus(e.target.value)}
                    IconComponent={ExpandMore}
                    sx={{
                        height: 32,
                        fontSize: "0.875rem",
                        "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                        },
                    }}
                    >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                </FormControl>
                </Box>
            </Box>

            {/* Navigation Tabs */}
            <Box className={styles.tabsSection}>
                <TabsComponent
                tabs={profileTabs}
                value={activeTab}
                onChange={(newValue) => setActiveTab(newValue as ProfileTabValue)}
                tabsClassName={styles.profileTabs}
                hideIndicator={false}
                />
                {activeTab === "interventions" && (
                <WarningAmber
                    sx={{ fontSize: 18, color: "#ff9800", ml: 1 }}
                />
                )}
            </Box>

            {/* Content Section */}
            <Box className={styles.contentSection}>
                {activeTab === "reports" && (
                <TableContainer component={Paper} className={styles.tableContainer}>
                    <Table className={styles.reportsTable}>
                    <TableHead>
                        <TableRow className={styles.tableHeaderRow}>
                        <TableCell className={styles.tableHeaderCell}>Date</TableCell>
                        <TableCell className={styles.tableHeaderCell}>Time</TableCell>
                        <TableCell className={styles.tableHeaderCell}>Calling Program</TableCell>
                        <TableCell className={styles.tableHeaderCell}>Status</TableCell>
                        <TableCell className={styles.tableHeaderCell} align="right">
                            Report
                        </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockReports.map((report) => (
                        <TableRow key={report.id} className={styles.tableRow}>
                            <TableCell className={styles.tableCell}>{report.date}</TableCell>
                            <TableCell className={styles.tableCell}>{report.time}</TableCell>
                            <TableCell className={styles.tableCell}>
                            {report.callingProgram}
                            </TableCell>
                            <TableCell className={styles.tableCell}>
                            {getStatusBadge(report.status)}
                            </TableCell>
                            <TableCell className={styles.tableCell} align="right">
                            {report.hasNotification ? (
                                <Badge badgeContent={1} color="error">
                                <Description sx={{ color: "#7f889a", cursor: "pointer" }} />
                                </Badge>
                            ) : (
                                <Description sx={{ color: "#7f889a", cursor: "pointer" }} />
                            )}
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
                )}
                {activeTab === "personal" && (
                <Box className={styles.emptyState}>
                    <Typography variant="body1" color="text.secondary">
                    Personal information content
                    </Typography>
                </Box>
                )}
                {activeTab === "logs" && (
                <Box className={styles.emptyState}>
                    <Typography variant="body1" color="text.secondary">
                    Logs content
                    </Typography>
                </Box>
                )}
                {activeTab === "interventions" && (
                <Box className={styles.emptyState}>
                    <Typography variant="body1" color="text.secondary">
                    Manual Interventions content
                    </Typography>
                </Box>
                )}
        </Box>
      </Box>
    </Container>
  );
}
