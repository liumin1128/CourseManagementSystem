export default {
  namespace: 'persist',
  state: {},
  reducers: {
  },
  effects: {
    *REHYDRATE({ payload }, { put }) {
      yield put({
        type: 'user/save',
        payload: {
          ...payload.user,
          persist: true,
        },
      });
    },
  },
  subscriptions: {},
};
