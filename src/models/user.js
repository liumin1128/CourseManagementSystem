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
        if (window.localStorage) {
          localStorage.setItem('token', data.token);
        }
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
    *changepw({ payload }, { call, put }) {
      const { data } = yield call(userService.changepw, { payload });
      if (data.success) {
        message.success('修改密码成功，请重新登录！');
        yield put({
          type: 'logout',
        });
      } else {
        message.error(data.message);
      }
    },
    *checkUser({ payload }, { select, put }) {
      if (window.localStorage) {
        const token = yield localStorage.getItem('token');
        if (!token) {
          yield put(routerRedux.push({
            pathname: '/',
          }));
        }
      } else {
        message.error('浏览器不支持localStorage');
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
