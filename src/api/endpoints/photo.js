import apiRequest from '../client';

// Загрузить фото для квартиры
export async function uploadPhoto(apartmentId, file) {
  const formData = new FormData();
  formData.append('file', file);
  return apiRequest(`/Photo/upload/${apartmentId}`, {
    method: 'POST',
    body: formData,
    headers: {}, // fetch сам выставит multipart
  });
}

// Удалить фото по id
export async function deletePhoto(id) {
  return apiRequest(`/Photo/delete/${id}`, {
    method: 'DELETE',
  });
}

// Получить фото квартиры
export async function getApartmentPhotos(apartmentId) {
  return apiRequest(`/Photo/apartment/${apartmentId}`, {
    method: 'GET',
  });
} 