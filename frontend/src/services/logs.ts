import request from './request';

export const getLogs = async () => {
  return await request.get('/api/logs');
}