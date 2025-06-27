import { authStorage } from './utils/auth-storage';

const API_BASE_URL = '/api'; // Измените на ваш реальный базовый URL

async function apiRequest(endpoint, { method = 'GET', body, headers = {}, ...options } = {}) {
  const accessToken = authStorage.getAccessToken();
  const fetchHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };
  if (accessToken) {
    fetchHeaders['Authorization'] = `Bearer ${accessToken}`;
  }
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: fetchHeaders,
    body: body ? JSON.stringify(body) : undefined,
    ...options,
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'API error');
  }
  if (response.status === 204) return null;
  return response.json();
}

export default apiRequest; 