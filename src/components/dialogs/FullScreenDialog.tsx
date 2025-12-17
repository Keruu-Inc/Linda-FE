import {
  Typography,
  Box,
  IconButton,
  Dialog,
} from '@mui/material';

import {
  Close as CloseIcon,
} from '@mui/icons-material';

export interface FullScreenDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  FooterComponent?: React.ReactNode;
}

export const FullScreenDialog = ({
  open,
  onClose,
  title,
  children,
  FooterComponent,
}: FullScreenDialogProps) => {
  return (
    <Dialog 
        open={open} 
        onClose={onClose}
        fullScreen
        slotProps={{
          paper: {
            sx: {
              bgcolor: '#f5f5f5',
              display: 'flex',
              flexDirection: 'column',
            }
          }
        }}
      >
        {/* Header */}
        <Box
          sx={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            bgcolor: '#fff',
            borderBottom: '1px solid #edf0f6ff',
            boxShadow: '0px 2px 20px 0px #d6d4f04d',
            flexShrink: 0,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1200,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            {title}
          </Typography>
          <IconButton onClick={onClose} sx={{
            bgcolor: '#f4f7fdff',

          }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Scrollable Content */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            my: 12,
          }}
        >
            {children}
        </Box>

        {/* Footer */}
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: '#fff',
            zIndex: 1200,
            height: 64,
            borderTop: '1px solid #edf0f6ff',
          }}
        >
        {FooterComponent}
        </Box>
      </Dialog>
    );
};