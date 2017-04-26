import * as courseService from '../services/course.js';
import { formatCourseList } from '../utils/format.js';

export default {
  namespace: 'course',
  state: {
    list: [],
  },
  reducers: {
    save(state, { payload }) { return { ...state, ...payload }; },
  },
  effects: {
    *fetch({ query }, { call, put }) {
      const { data: { courses } } = yield call(courseService.fetch, { query });
      yield put({ type: 'save', payload: { list: formatCourseList(courses) } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/course/list') {
          dispatch({ type: 'fetch', query });
        }
      });
    },
  },
};
