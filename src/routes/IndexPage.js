import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';

function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>欢迎使用高校教师教学质量评价系统</h1>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
