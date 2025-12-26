import type { UserManagerSettings } from 'oidc-client-ts';

export const authConfig: UserManagerSettings = {
  authority: 'https://keruu-id-dev.azurewebsites.net/',
  client_id: 'Keruu-Consumer',
  redirect_uri: `${window.location.origin}/auth/callback`,
  response_type: 'code',
  scope: 'openid profile Keruu-scope',
  post_logout_redirect_uri: window.location.origin,
};