import { useEffect, useState } from 'react';
import { UserManager, User } from 'oidc-client-ts';
import { authConfig } from '../config/auth';

const userManager = new UserManager(authConfig);

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userManager.getUser().then(setUser).finally(() => setLoading(false));
    
    userManager.events.addUserLoaded(setUser);
    return () => userManager.events.removeUserLoaded(setUser);
  }, []);

  return {
    user,
    isAuthenticated: !!user && !user.expired,
    loading,
    login: () => userManager.signinRedirect(),
    logout: () => userManager.signoutRedirect(),
    getToken: () => user?.access_token || null,
  };
}