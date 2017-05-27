import { message } from 'antd';
import { routerRedux } from 'dva/router';
import * as userService from '../services/user.js';

export default {
  namespace: 'user',
  state: {},
  reducers: {
    save(state, { payload }) { return { ...state, ...payload }; },
  },
  effects: {
    *login({ payload }, { call, put }) {
      const { data } = yield call(userService.login, { payload });
      if (data.success) {
        message.success('登录成功');
        yield put({
          type: 'save',
          payload: {
            ...data.user,
            token: data.token,
          },
        });
        yield put(routerRedux.push({
          pathname: '/home',
        }));
      } else {
        message.error(data.message);
      }
    },
    *logout({ payload }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          token: null,
        },
      });
      yield put(routerRedux.push({
        pathname: '/',
      }));
    },
    *checkUser({ payload }, { select, put }) {
      const { user } = yield select();
      if (user.persist && !user.token) {
        yield put(routerRedux.push({
          pathname: '/',
        }));
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname !== '/') {
          dispatch({ type: 'checkUser' });
        } else {
          // dispatch({ type: 'checkUser' });
        }
      });
    },
  },
};
