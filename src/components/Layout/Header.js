import React from 'react';
import { Menu, Icon } from 'antd';
import styles from './Header.css';

const SubMenu = Menu.SubMenu;

// const logOutAndGotoUrl = () => {
//   logOut().then((data) => {
//     console.log(data);
//     if (data.code === 200) {
//       message.success('注销成功！');
//     } else {
//       message.error(`系统异常！${data.code}`);
//     }
//   });
//   hashHistory.push('/sign');
// };

function Header({ dispatch, location, nickName, avatarUrl, type }) {
  function logOutAndGotoUrl() {
    dispatch({
      type: 'user/logout',
    });
  }
  return (
    <div className={styles.normal}>
      <span />
      <Menu
        className={styles.menu}
        selectedKeys={[location.pathname]}
        mode="horizontal"
        // theme="dark"
      >
        <SubMenu
          className={styles.user}
          title={
            <span className={styles.userInfo}>
              <img className={styles.avatar} src={avatarUrl} alt="" />
              {type === 'admin' && '管理员：'}
              {type === 'student' && '学生：'}
              {type === 'teacher' && '教师：'}
              {nickName || '未登录？'}
            </span>
            }
        >
          <Menu.Item key="setting:1"><a onClick={logOutAndGotoUrl}>注销登录</a></Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
}

export default Header;

