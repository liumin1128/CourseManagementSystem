import request from '../utils/request';
import { fetch } from '../utils/common.js';

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

export async function changepw({ payload }) {
  return fetch('/api/user/changepw', payload);
}
