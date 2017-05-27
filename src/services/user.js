import { fetch } from '../utils/common.js';

export function login({ payload }) {
  return fetch('/api/user/login', payload);
}
