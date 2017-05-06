import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, Tooltip, Button, Badge } from 'antd';
import Table from '../components/Ui/Table';
import styles from './UsersList.less';
import { getIndentity, type2status } from '../utils/common.js';


class UsersList extends Component {
  constructor(props) {
    super(props);
    this.keys = ['avatarUrl', 'username', 'nickName', 'type', 'createdAt', 'op'];
    this.columns = [{
      title: '头像',
      dataIndex: 'avatarUrl',
      key: 'avatarUrl',
      render: avatar => <img className={styles.avatar} src={avatar} role="presentation" />,
    }, {
      title: '用户名·',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: '昵称',
      dataIndex: 'nickName',
      key: 'nickName',
    }, {
      title: '身份',
      dataIndex: 'type',
      key: 'type',
      render: (type, record) => <Badge status={type2status(type, record.grade)} text={getIndentity(record.type, record.grade)} />,
    }, {
      title: '操作',
      dataIndex: 'op',
      key: 'op',
      render: (i, record) => <span className={styles.operation}>
        {/* <a onClick={this.edite.bind(this, record)}>编辑</a>*/}
        <a onClick={this.delHandler.bind(this, record)}>删除</a>
      </span>,
    }];
  }
  delHandler = (record) => {
    this.props.dispatch({
      type: 'users/del',
      payload: {
        id: record.id,
      },
    });
  }
  addHandler = () => {
    this.props.dispatch(routerRedux.push({
      pathname: 'users/new',
    }));
  }
  render() {
    const { list, loading } = this.props;
    return (
      <Card title="课程列表" style={{ padding: 0, borderRadius: 0 }} bodyStyle={{ padding: 8 }}>
        <div className={styles.toolbar}>
          <span />
          <Tooltip placement="top" title="新增一项">
            <Button icon="plus" type="primary" onClick={this.addHandler}>新增</Button>
          </Tooltip>
        </div>
        <Table dataSource={list} loading={loading} columns={this.columns} keys={this.keys} />
      </Card>
    );
  }
}

function mapStateToProps(state) {
  const { list } = state.users;
  return {
    list,
    loading: state.loading.models.users,
  };
}

export default connect(mapStateToProps)(UsersList);
