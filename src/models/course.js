import { message } from 'antd';
import { routerRedux } from 'dva/router';
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
    *select({ payload }, { call, put }) {
      const params = {
        course: payload.id,
        student: '590ed3ef8b411c0f548be2f3',
      };
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
    *evaluate({ payload }, { call, put }) {
      console.log(payload);
      const params = {
        ...payload,
        from: '590ed3ef8b411c0f548be2f3',
        course: '590f569388a9f113a01f5c38',
      };
      const { data } = yield call(courseService.evaluate, { payload: { ...params } });
      console.log(data);
    },
    *getTeacherGrade({ payload }, { call, put }) {
      console.log(payload);
      const { data } = yield call(courseService.getTeacherGrade, { payload: { id: '590ec0429c6c3b0cb82f24df' } });
      console.log(data);
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/course/list') {
          dispatch({ type: 'fetch', query });
        }
        if (pathname === '/teacher') {
          dispatch({ type: 'getTeacherGrade', query });
        }
      });
    },
  },
};
