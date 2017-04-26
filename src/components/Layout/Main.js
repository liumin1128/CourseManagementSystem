import React, { Component } from 'react';
import { Link } from 'dva/router';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import styles from './Main.less';
import { ROUTE_CONF } from '../../utils/constants.js';
import MyHeader from './Header.js';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Main extends Component {
  state = {
    collapsed: true,
    theme: 'dark',
    mode: 'vertical',
    openKeys: ['/news'],
  };
  onCollapse = (collapsed) => {
    // console.log(collapsed);
    // console.log(this.props.location);
    this.setState({ collapsed, mode: collapsed ? 'vertical' : 'inline' });
  }
  onSelect = (aa) => {
    // console.log(aa);
  }
  onOpenChange = (openKeys) => {
    // console.log(openKeys);
    if (this.state.collapsed) {
      // console.log(openKeys);
      // this.setState({ openKeys, theme: 'light' });
      this.setState({ openKeys });
    } else {
      const state = this.state;
      const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
      const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

      let nextOpenKeys = [];
      if (latestOpenKey) {
        nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
      }
      if (latestCloseKey) {
        nextOpenKeys = this.getAncestorKeys(latestCloseKey);
      }
      // console.log(nextOpenKeys);
      this.setState({ openKeys: nextOpenKeys });
    }
  };
  getAncestorKeys = (key) => {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  };
  render() {
    console.log(this.props);
    console.log(this.props.location.pathname.split('/'));
    const path = this.props.location.pathname.split('/');
    const { collapsed, theme, mode, openKeys } = this.state;
    const { children, location, routes, params } = this.props;
    return (
      <Layout style={{ height: '100%' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo">
            <img className="icon" style={{ height: '80%', borderRadius: '5px' }} src="http://om4lyr5bv.bkt.clouddn.com/apple-touch-icon.png" alt="" />
            <span className="text">华人地产网</span>
          </div>
          <Menu
            refs="menu"
            mode={mode}
            theme={theme}
            selectedKeys={[location.url]}
            onOpenChange={this.onOpenChange}
            onSelect={this.onSelect}
            // openKeys={openKeys}
            // defaultSelectedKeys={['user']}
          >
            {
              ROUTE_CONF.map((menu) => {
                return menu.sub ?
                  <SubMenu
                    key={menu.url}
                    title={<span><Icon type={menu.icon} /><span>{menu.text}</span></span>}
                  >
                    {
                      menu.sub.map(i =>
                        <Menu.Item key={i.url}>
                          <Link to={i.url}><span className="nav-text">{i.text}</span></Link>
                        </Menu.Item>,
                      )
                    }
                  </SubMenu>
                  :
                  <Menu.Item key={menu.url}>
                    <Link to={menu.url}>
                      <Icon type={menu.icon} />
                      {!collapsed && <span className="nav-text">{menu.text}</span>}
                    </Link>
                  </Menu.Item>;
              })
            }
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <MyHeader location={location} />
          </Header>
          <Content>
            <Breadcrumb className={styles.Breadcrumb} routes={routes} params={params} />
            {/* <Breadcrumb>
              {
                path.map(i =>
                  <Breadcrumb.Item href="">
                    <Icon type="home" />
                    <span>{URLSCN[i]}</span>
                  </Breadcrumb.Item>,
                )
              }
            </Breadcrumb>*/}
            <div style={{ padding: 16, paddingTop: 0, minHeight: 360 }}>
              {children}
            </div>
          </Content>

          {
              /**
               * <Footer style={{ textAlign: 'center' }}>
            HuarenHouse ©2017 Created by React Ant MIN
          </Footer>
              */
            }

        </Layout>
      </Layout>
    );
  }
}

export default Main;
