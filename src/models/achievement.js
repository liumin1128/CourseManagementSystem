import { message } from 'antd';
import { routerRedux } from 'dva/router';
import * as achievementService from '../services/achievement.js';
// import { formatachievementList } from '../utils/format.js';

export default {
  namespace: 'achievement',
  state: {
    list: [],
  },
  reducers: {
    save(state, { payload }) { return { ...state, ...payload }; },
  },
  effects: {
    *fetch({ query }, { call, put, select }) {
      const { data } = yield call(achievementService.get, { payload: { ...query } });
      yield put({ type: 'save', payload: { list: data.data } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/teacher/achievement') {
          dispatch({ type: 'fetch' });
        }
      });
    },
  },
};
