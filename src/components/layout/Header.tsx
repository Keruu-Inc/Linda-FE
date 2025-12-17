import { useState } from "react";
import styles from "./Header.module.css";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Badge,
    Button,
    CircularProgress,
    Alert,
    Snackbar,
  } from '@mui/material';
import { TabsComponent, type TabItem } from "../ui/TabsComponent";
import tabStyles from "../ui/TabsComponent.module.css";
import { AddProfileForm } from '../forms/AddProfileForm';
import { FullScreenDialog } from '../dialogs/FullScreenDialog';
import { useCreatePatient } from '../../hooks/usePatients';
import { usePatientStatuses } from '../../hooks/useDropdowns';
import { transformFormDataToPatientRequest } from '../../utils/formTransformers';
import type { AddProfileFormData } from '../../utils/formTransformers';
import {
  Add as AddIcon,
  NotificationsOutlined,
  PersonOutlined,
  ExpandMore,
} from "@mui/icons-material";
interface HeaderProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export function Header({ currentTab = 'profiles', onTabChange }: HeaderProps) {
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [addProfileOpen, setAddProfileOpen] = useState(false);
  const [snackBarInfo, setSnackBarInfo] = useState<{ message: string; severity: 'success' | 'error' } | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const createPatientMutation = useCreatePatient();
  const { data: patientStatusesData } = usePatientStatuses();

  const handleAddProfile = (data: AddProfileFormData) => {
    // Get the default patient status ID
    const defaultStatus = patientStatusesData?.items.find(s => s.isDefault);
    const statusId = defaultStatus?.id || patientStatusesData?.items[0]?.id;

    if (!statusId) {
      setSnackBarInfo({ message: 'Unable to create patient: No patient status available', severity: 'error' });
      return;
    }

    const patientRequest = transformFormDataToPatientRequest(data, statusId);

    createPatientMutation.mutate(patientRequest, {
      onSuccess: (response) => {
        console.log('Patient created successfully:', response);
        setSnackBarInfo({ message: `Profile created successfully for ${response.item.firstName} ${response.item.lastName}`, severity: 'success' });
        setAddProfileOpen(false);
      },
      onError: (error: unknown) => {
        console.error('Error creating patient:', error);
        const errorMsg = (error as { response?: { data?: { error?: { message?: string } } }; message?: string }).response?.data?.error?.message || 
                        (error as { message?: string }).message || 
                        'Failed to create profile';
        setSnackBarInfo({ message: errorMsg, severity: 'error' });
      },
    });
  };

  const mainTabs: TabItem[] = [
    { value: "profiles", label: "Profiles" },
    { value: "calling-programs", label: "Calling Programs" },
    { value: "interventions", label: "Interventions" },
    { value: "settings", label: "Settings" },
  ];

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "#F4F7FD", color: "#000", boxShadow: "none" }}
    >
      <Toolbar
        className={styles.toolbar}
        sx={{ px: 3 }}
      >
        <Typography variant="h6" className={styles.logo}>
          <span className={styles.logoText}>KERUU-AI</span>
        </Typography>

        <Box className={styles.tabsContainer}>
          <TabsComponent
            tabs={mainTabs}
            value={currentTab}
            onChange={(newValue) => onTabChange?.(newValue)}
            tabsClassName={`${tabStyles.tabs} ${styles.headerTabs}`}
            tabClassName={tabStyles.tab}
            selectedTabClassName={tabStyles.selected}
            hideIndicator={true}
          />
        </Box>
        
        <Box className={styles.rightActions}>
          <IconButton className={styles.addButton} color="inherit" onClick={() => setAddProfileOpen(true)}>
            <AddIcon />
          </IconButton>

          <IconButton className={styles.notificationButton} color="inherit">
            <Badge badgeContent={1} color="error" variant="dot">
              <NotificationsOutlined />
            </Badge>
          </IconButton>

          <Box className={styles.userMenuBox}>
            <IconButton className={styles.userMenuAvatarButton} color="inherit">
              <PersonOutlined />
            </IconButton>
            <Box className={styles.userMenuTextContainer}>
              <Typography className={styles.userMenuName}>
                Evelyn Lee
              </Typography>
              <Typography className={styles.userMenuRole}>
                Post-DC Manager
              </Typography>
            </Box>
            <IconButton
              className={styles.userMenuArrowButton}
              color="inherit"
            >
              <ExpandMore />
            </IconButton>
          </Box>
        </Box>

        <Menu
          anchorEl={userMenuAnchor}
          open={Boolean(userMenuAnchor)}
          onClose={() => setUserMenuAnchor(null)}
        >
          <MenuItem onClick={() => setUserMenuAnchor(null)}>Profile</MenuItem>
          <MenuItem onClick={() => setUserMenuAnchor(null)}>Settings</MenuItem>
          <MenuItem onClick={() => setUserMenuAnchor(null)}>Logout</MenuItem>
        </Menu>
      </Toolbar>

      <FullScreenDialog 
        open={addProfileOpen}
        onClose={() => setAddProfileOpen(false)}
        title="Add Profile"
        FooterComponent={
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              height: '100%',
              px: 3,
              bgcolor: '#fff',
            }}
          >
            <Button 
              type="submit"
              form="add-profile-form"
              variant="contained"
              disabled={createPatientMutation.isPending}
              sx={{ 
                minWidth: 240, 
                bgcolor: isFormValid ? 'primary.main' : '#f4f4f4', 
                boxShadow: 'none', 
                color: isFormValid ? '#fff' : '#7f889aff', 
                borderRadius: 10, 
                textTransform: 'capitalize', 
                fontWeight: isFormValid ? 500 : 300,
                '&:hover': {
                  bgcolor: isFormValid ? 'primary.dark' : '#e8e8e8',
                },
              }}
              startIcon={createPatientMutation.isPending ? <CircularProgress size={20} /> : undefined}
            >
              {createPatientMutation.isPending ? 'Adding...' : 'Add User'}
            </Button>
          </Box>
        }
      >
        <AddProfileForm onSubmit={handleAddProfile} onValidityChange={setIsFormValid} />
      </FullScreenDialog>

      {/* Snackbar is currently local in Header, should be moved to a more global context */}
      <Snackbar
        open={!!snackBarInfo}
        autoHideDuration={4000}
        onClose={() => setSnackBarInfo(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackBarInfo(null)} severity={snackBarInfo?.severity} sx={{ width: '100%' }}>
          {snackBarInfo?.message}
        </Alert>
      </Snackbar>
    </AppBar>
  );
}
