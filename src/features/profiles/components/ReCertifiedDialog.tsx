import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import styles from "./ReCertifiedDialog.module.css";

interface ReCertifiedDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (reason: string, otherReason?: string) => void;
  patientId: string;
}

const REASON_OPTIONS = [
  "New or worsening medical condition",
  "Decline in functional status",
  "Medication changes or management problems",
  "Post hospital event",
  "Loss or lack of support",
  "Other",
];

export function ReCertifiedDialog({
  open,
  onClose,
  onConfirm,
}: ReCertifiedDialogProps) {
  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");

  const handleReasonChange = (value: string) => {
    setSelectedReason(value);
    if (value !== "Other") {
      setOtherReason("");
    }
  };

  const handleConfirm = () => {
    if (selectedReason) {
      onConfirm(
        selectedReason,
        selectedReason === "Other" ? otherReason : undefined
      );
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedReason("");
    setOtherReason("");
    onClose();
  };

  const isConfirmDisabled =
    !selectedReason || (selectedReason === "Other" && !otherReason.trim());

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      slotProps={{
        paper: {
          className: `${styles.dialogPaper} ${
            selectedReason === "Other" ? styles.dialogPaperExtended : ""
          }`,
        },
      }}
    >
      <DialogTitle className={styles.dialogTitle}>
        <IconButton
          onClick={handleClose}
          className={styles.closeButton}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={styles.dialogContent}>
        <Box className={styles.contentWrapper}>
          <Typography className={styles.title}>
            Re-Certified Profile?
          </Typography>
          <Typography className={styles.description}>
            Are you sure you want to re-certified this profile from the
            workflow? Please select a reason before confirming.
          </Typography>

          <Select
            value={selectedReason}
            onChange={(e) => handleReasonChange(e.target.value)}
            displayEmpty
            className={styles.select}
            MenuProps={{
              PaperProps: {
                className: styles.selectMenu,
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: "48px",
              },
            }}
          >
            <MenuItem value="" disabled>
              Select a reason
            </MenuItem>
            {REASON_OPTIONS.map((option) => (
              <MenuItem
                key={option}
                value={option}
                className={styles.selectItem}
              >
                {option}
              </MenuItem>
            ))}
          </Select>

          {selectedReason === "Other" && (
            <TextField
              fullWidth
              placeholder="Enter reason"
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
              required
              className={styles.textField}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "48px",
                },
              }}
            />
          )}

          <Box className={styles.buttonContainer}>
            <Button
              variant="outlined"
              onClick={handleClose}
              className={styles.cancelButton}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleConfirm}
              disabled={isConfirmDisabled}
              className={styles.confirmButton}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
