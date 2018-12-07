/**
 * Fetch wrapper that adds the JWT Bearer Header
 */
export function authedFetch(url, init?: RequestInit) {
  const headers = new Headers((init && init.headers) || []);
  const accessToken = localStorage.getItem('access_token');

  if (accessToken) {
    headers.append('Authorization', `Bearer ${accessToken}`);
  }

  const options = {
    ...(init || {}),
    headers,
  };

  return fetch(url, options);
}
