import React from 'react';
import { connect } from 'dva';
import MainLayout from '../components/Layout/Main';

function App({ children, location, routes }) {
  return (
    <MainLayout location={location} routes={routes}>
      {children}
    </MainLayout>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(App);
