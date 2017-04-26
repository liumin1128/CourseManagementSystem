import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import styles from './IndexPage.css';

function IndexPage() {
  return (
    <div className={styles.normal}>
      <Button type="primary">Primary</Button>
      <h1>9999999999</h1>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
