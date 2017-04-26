import React from 'react';
import { connect } from 'dva';
import styles from './CourseList.css';

function CourseList() {
  return (
    <div className={styles.normal}>
      Route Component: CourseList
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(CourseList);
