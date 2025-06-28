import apiRequest from '../client';

export async function getClients() {
  return apiRequest('/Client', { method: 'GET' });
}

export async function checkClientExists(phone) {
  return apiRequest(`/clients/exists?phone=${encodeURIComponent(phone)}`, { method: 'GET' });
} 