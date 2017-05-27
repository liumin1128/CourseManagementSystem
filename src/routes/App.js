import React from 'react';
import { connect } from 'dva';
import MainLayout from '../components/Layout/Main';

function App({ children, dispatch, location, routes, nickName, avatarUrl, type }) {
  return (
    <MainLayout dispatch={dispatch} location={location} routes={routes} nickName={nickName} avatarUrl={avatarUrl} type={type}>
      {children}
    </MainLayout>
  );
}

function mapStateToProps(state) {
  const { nickName, avatarUrl, type } = state.user;
  return {
    nickName,
    avatarUrl,
    type,
    loading: state.loading.models.user,
  };
}

export default connect(mapStateToProps)(App);
