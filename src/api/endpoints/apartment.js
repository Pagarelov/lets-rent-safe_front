import apiRequest from '../client';

// Получить свои квартиры
export async function getMyApartments() {
  return apiRequest('/Apartment/my-apartments', { method: 'GET' });
}

// Создать новую квартиру
export async function createApartment(data) {
  return apiRequest('/Apartment', {
    method: 'POST',
    body: data,
  });
}

// Обновить квартиру по id
export async function updateApartment(id, data) {
  return apiRequest(`/Apartment/update/${id}`, {
    method: 'PUT',
    body: data,
  });
}

// Удалить квартиру по id
export async function deleteApartment(id) {
  return apiRequest(`/Apartment/delete/${id}`, {
    method: 'DELETE' });
} 