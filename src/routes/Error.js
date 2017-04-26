import React from 'react';
import { connect } from 'dva';
import styles from './Error.css';
import NotFount from '../components/Layout/NotFound';

function Error() {
  return (
    <div className={styles.normal}>
      <NotFount />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Error);
