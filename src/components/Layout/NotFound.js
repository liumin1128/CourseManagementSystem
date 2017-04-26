import React from 'react';
import { Link } from 'dva/router';
import styles from './NotFound.less';

function NotFound() {
  return (
    <div className={styles.box}>
      <h1>404</h1>
      <h3>没有这个页面啦，要不要<Link to="/"> 返回首页</Link></h3>
    </div>
  );
}

export default NotFound;
