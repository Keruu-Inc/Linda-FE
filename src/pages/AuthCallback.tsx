import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserManager } from 'oidc-client-ts';
import { authConfig } from '../config/auth';
import { CircularProgress, Box } from '@mui/material';

const userManager = new UserManager(authConfig);

export function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    userManager.signinRedirectCallback().then(() => {
      navigate('/', { replace: true });
    });
  }, [navigate]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <CircularProgress />
    </Box>
  );
}