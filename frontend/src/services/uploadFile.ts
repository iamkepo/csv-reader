import request from './request';

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return await request.post('/api/upload', formData);
}