import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { CircularProgress, Box } from '@mui/material';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading, login } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) login();
  }, [loading, isAuthenticated, login]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
}