import React from 'react';
import { connect } from 'dva';
import styles from './style.less';

function Teacher() {
  return (
    <div className={styles.normal}>
      8888888888888
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Teacher);
