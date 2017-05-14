import request from '../utils/request';
import { myRequest } from '../utils/common.js';

export async function fetch() {
  return request('/api/course/list');
}

export async function add({ payload }) {
  return request('/api/course/add', myRequest({ payload, method: 'POST' }));
}

export async function del({ payload }) {
  return request('/api/course/del', myRequest({ payload, method: 'DELETE' }));
}

export async function select({ payload }) {
  return request('/api/course/select', myRequest({ payload, method: 'POST' }));
}
