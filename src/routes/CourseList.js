import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, Tooltip, Button } from 'antd';
import Table from '../components/Ui/Table';
import styles from './CourseList.less';

class CourseList extends Component {
  constructor(props) {
    super(props);
    this.keys = ['name', 'desc', 'teacher', 'createdAt', 'op'];
    this.columns = [{
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
    }, {
      title: '授课老师',
      dataIndex: 'teacher',
      key: 'teacher',
      render: teacher => <a>{teacher.nickName}</a>,
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
      type: 'course/del',
      payload: {
        id: record.id,
      },
    });
  }
  addHandler = () => {
    this.props.dispatch(routerRedux.push({
      pathname: 'course/new',
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
  const { list } = state.course;
  return {
    list,
    loading: state.loading.models.course,
  };
}

export default connect(mapStateToProps)(CourseList);
