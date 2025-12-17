import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  PersonOutline as PersonOutlineIcon,
  Pause as PauseIcon,
  Assignment as ReCertifiedIcon,
  DeleteOutline,
} from "@mui/icons-material";
import { useState } from "react";
import styles from "./PatientsActionsMenu.module.css";
import { ReCertifiedDialog } from "./ReCertifiedDialog";

interface PatientActionsMenuProps {
  patientId: string;
  onActionClick: (patientId: string, action: string, reason?: string) => void;
}

export function PatientActionsMenu({
  patientId,
  onActionClick,
}: PatientActionsMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [reCertifiedDialogOpen, setReCertifiedDialogOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action: string) => {
    if (action === "re-certify") {
      setReCertifiedDialogOpen(true);
      handleClose();
    } else {
      onActionClick(patientId, action);
      handleClose();
    }
  };

  const handleReCertifiedConfirm = (reason: string, otherReason?: string) => {
    const finalReason = reason === "Other" ? otherReason || "" : reason;
    onActionClick(patientId, "re-certify", finalReason);
    setReCertifiedDialogOpen(false);
  };

  return (
    <>
      <IconButton
        size="small"
        onClick={handleClick}
        className={styles.actionButton}
      >
        <MoreVertIcon className={styles.dotsIcon} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className={styles.menu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            className: styles.menuPaper,
          },
        }}
      >
        <MenuItem
          onClick={() => handleAction("view")}
          className={styles.menuItem}
        >
          <ListItemIcon>
            <PersonOutlineIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>See Profile</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => handleAction("pause")}
          className={styles.menuItem}
        >
          <ListItemIcon>
            <PauseIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Pause All Sequences</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => handleAction("re-certify")}
          className={styles.menuItem}
        >
          <ListItemIcon>
            <ReCertifiedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Re-Certified</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => handleAction("archive")}
          className={styles.menuItem}
        >
          <ListItemIcon>
            <DeleteOutline fontSize="small" />
          </ListItemIcon>
          <ListItemText>Archive</ListItemText>
        </MenuItem>
      </Menu>

      <ReCertifiedDialog
        open={reCertifiedDialogOpen}
        onClose={() => setReCertifiedDialogOpen(false)}
        onConfirm={handleReCertifiedConfirm}
        patientId={patientId}
      />
    </>
  );
}
