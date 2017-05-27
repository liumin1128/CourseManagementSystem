import request from '../utils/request';

export function login({ payload }) {
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ ...payload }),
  };
  return request('/api/user/login', options);
}
