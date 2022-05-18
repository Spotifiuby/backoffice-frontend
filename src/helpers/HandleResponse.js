import { authenticationService } from '../services/AuthenticationService';

export function handleResponse(response) {
  const data = response.body;
  if (!response.ok) {
    if ([401, 403].includes(response.status)) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      authenticationService.logout();
      window.location.reload();
    }

    const error = (data && data.code) || response.statusText;
    return Promise.reject(error);
  }

  return response;
}