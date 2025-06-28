import apiRequest from '../client';

// Начать логин (отправка телефона)
export async function loginStart(data) {
  return apiRequest('/Auth/login/start', {
    method: 'POST',
    body: data,
  });
}

// Подтвердить логин (код/звонок)
export async function loginConfirm(data) {
  return apiRequest('/Auth/login/confirm', {
    method: 'POST',
    body: data,
  });
}

// Начать регистрацию (отправка телефона)
export async function registerStart(data) {
  return apiRequest('/Auth/register/start', {
    method: 'POST',
    body: data,
  });
}

// Подтвердить регистрацию
export async function registerConfirm(data) {
  return apiRequest('/Auth/register/confirm', {
    method: 'POST',
    body: data,
  });
}

// Получить информацию о пользователе
export async function getInfo() {
  return apiRequest('/Auth/info', {
    method: 'GET',
  });
}

// Обновить токен
export async function refreshToken(data) {
  return apiRequest('/Auth/refresh', {
    method: 'POST',
    body: data,
  });
}

// Отозвать сессию по tokenId
export async function revokeSession(tokenId) {
  return apiRequest(`/Auth/revoke-session/${tokenId}`, {
    method: 'POST',
  });
} 