import * as courseService from '../services/course.js';

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
      const data = yield call(courseService.fetch, { query });
      console.log(data);
      // yield put({ type: 'save', payload: { bookSource } });
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
