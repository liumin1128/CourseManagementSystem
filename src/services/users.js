import { fetch } from '../utils/common.js';

export async function get({ query }) {
  return fetch('/api/users/list', query);
}

export async function add({ payload }) {
  return fetch('/api/users/add', payload);
}

export async function del({ payload }) {
  return fetch('/api/users/del', payload);
}

export async function batchAdd({ payload }) {
  return fetch('/api/users/batchadd', payload);
}
