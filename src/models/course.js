import { message } from 'antd';
import { routerRedux } from 'dva/router';
import * as courseService from '../services/course.js';
import { formatCourseList } from '../utils/format.js';

export default {
  namespace: 'course',
  state: {
    list: [],
    teachers: [],
  },
  reducers: {
    save(state, { payload }) { return { ...state, ...payload }; },
  },
  effects: {
    *fetch({ query }, { call, put, select }) {
      const { data: { courses } } = yield call(courseService.fetch, { payload: { ...query } });
      yield put({ type: 'save', payload: { list: formatCourseList(courses) } });
    },
    *add({ payload }, { call, put }) {
      const { data } = yield call(courseService.add, { payload });
      if (data.status === 200) {
        message.success(data.message);
        yield put(routerRedux.push({
          pathname: 'course/list',
        }));
      } else {
        message.error(data.message);
      }
    },
    *del({ payload }, { call, put }) {
      const { data } = yield call(courseService.del, { payload });
      if (data.status === 200) {
        message.success(data.message);
        yield put({
          type: 'fetch',
        });
      } else {
        message.error(data.message);
      }
    },
    *select({ payload }, { call, put, select }) {
      const params = { course: payload.id };
      const { data } = yield call(courseService.select, { payload: params });
      if (data.status === 200) {
        message.success(data.message);
        yield put({
          type: 'fetch',
        });
      } else {
        message.error(data.message);
      }
    },
    *evaluate({ payload }, { call, put, select }) {
      const params = { ...payload };
      const { data } = yield call(courseService.evaluate, { payload: { ...params } });
      if (data.success) {
        message.success(data.message);
        yield put(routerRedux.push({
          pathname: 'course/list',
        }));
      } else {
        message.error(data.message);
      }
    },
    *getTeacherGrade({ payload }, { call, put }) {
      console.log(payload);
      const { data } = yield call(courseService.getTeacherGrade, { payload: { id: '590ec0429c6c3b0cb82f24df' } });
      console.log(data);
    },
    *getTeacherList({ payload }, { call, put }) {
      const { data: { data } } = yield call(courseService.getTeacherList, {});
      yield put({ type: 'save', payload: { teachers: data } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/course/list') {
          dispatch({ type: 'fetch', query });
        }
        if (pathname === '/course/new') {
          dispatch({ type: 'getTeacherList', query });
        }
        if (pathname === '/teacher') {
          dispatch({ type: 'getTeacherGrade', query });
        }
      });
    },
  },
};
