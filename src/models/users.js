import { message } from 'antd';
import { routerRedux } from 'dva/router';
import * as usersService from '../services/users.js';
import { formatCourseList } from '../utils/format.js';

export default {
  namespace: 'users',
  state: {
    list: [],
  },
  reducers: {
    save(state, { payload }) { return { ...state, ...payload }; },
  },
  effects: {
    *fetch({ query }, { call, put }) {
      const { data: { users } } = yield call(usersService.get, { query });
      yield put({ type: 'save', payload: { list: formatCourseList(users) } });
    },
    *add({ payload }, { call, put }) {
      const { data } = yield call(usersService.add, { payload });
      if (data.status === 200) {
        message.success(data.message);
        yield put(routerRedux.push({
          pathname: 'users/list',
        }));
      } else {
        message.error(data.message);
      }
    },
    *batchAdd({ payload }, { call, put }) {
      console.log(payload);
      // const { data } = yield call(usersService.batchAdd, { payload });
      // if (data.success) {
      //   message.success(data.message);
      // } else {
      //   message.error(data.message);
      // }
    },
    *del({ payload }, { call, put }) {
      const { data } = yield call(usersService.del, { payload });
      if (data.status === 200) {
        message.success(data.message);
        yield put({
          type: 'fetch',
        });
      } else {
        message.error(data.message);
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users/list') {
          dispatch({ type: 'fetch', query });
        }
      });
    },
  },
};
