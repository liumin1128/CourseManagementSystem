import React from 'react';
import { connect } from 'dva';
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

function Header({ dispatch, location, userInfo }) {
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
        {
          userInfo &&
          <SubMenu
            className={styles.user}
            title={
                userInfo ? <span className={styles.userInfo}>
                  <img className={styles.avatar} src={userInfo.avatar} alt="" />
                  {userInfo.nickName}
                </span> : <span><Icon type="user" /> 管理员</span>
          }
          >
            <Menu.Item key="setting:1"><a onClick={logOutAndGotoUrl}>注销登录</a></Menu.Item>
          </SubMenu>
        }
      </Menu>
    </div>
  );
}

function mapStateToProps(state) {
  const { userInfo } = state.user;
  return {
    userInfo,
    loading: state.loading.models.login,
  };
}


export default connect(mapStateToProps)(Header);

