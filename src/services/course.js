import request from '../utils/request';
import { myRequest } from '../utils/common.js';

// export async function fetch() {
//   return request('/api/course/list');
// }

export async function fetch({ payload }) {
  return request('/api/course/list', myRequest({ payload, method: 'POST' }));
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

export async function evaluate({ payload }) {
  return request('/api/course/evaluate', myRequest({ payload, method: 'POST' }));
}

export async function getTeacherGrade({ payload }) {
  return request('/api/teacher/getgrade', myRequest({ payload, method: 'POST' }));
}

export async function getTeacherList({ payload }) {
  return request('/api/users/getTeacherList', myRequest({ payload, method: 'POST' }));
}

