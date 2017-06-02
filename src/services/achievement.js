import { fetch } from '../utils/common.js';

export async function get() {
  return fetch('/api/course/achievement');
}

