import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, Tooltip, Button, Popover, Tag, Input, message } from 'antd';
import Table from '../../components/Ui/Table';
import styles from './CourseList.less';

const Search = Input.Search;

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
      render: teacher => <Popover
        content={<div style={{ maxWidth: 300 }}>
          <ul>
            <li><img style={{ width: 100, height: 100 }} src={teacher && teacher.avatarUrl} alt="" /></li>
            <li>姓名：{teacher && teacher.nickName}</li>
            <li>教师号：{teacher && teacher.username}</li>
          </ul>
        </div>} title="教师信息"
      >
        <a>{teacher && teacher.nickName}</a>
      </Popover>,
    }, {
      title: '学生列表',
      dataIndex: 'students',
      key: 'students',
      render: students => <Popover
        content={<div style={{ maxWidth: 300 }}>
          {students.map(i => <Tag key={i._id} color="cyan">{i.nickName}</Tag>)}
        </div>} title="当前听课学生"
      >
        <a>{students.length}名学生</a>
      </Popover>,
    }, {
      title: '操作',
      dataIndex: 'op',
      key: 'op',
      render: (i, record) => <span className={styles.operation}>
        <a onClick={this.delHandler.bind(this, record)}>删除</a>
        <a onClick={this.delHandler.bind(this, record)}>查看成绩</a>
      </span>,
    }];
  }
  evaluateHandler = (record) => {
    this.props.dispatch(routerRedux.push({
      pathname: 'evaluate/student',
      query: {
        course: record.id,
      },
    }));
  }
  selectHandler = (record) => {
    this.props.dispatch({
      type: 'course/select',
      payload: {
        id: record.id,
      },
    });
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
  handleGetDataByFilter = (obj, val) => {
    // if (!val) {
    //   message.error('请输入关键字！');
    //   return;
    // }
    this.props.dispatch(routerRedux.push({
      pathname: this.props.location.pathname,
      query: { ...this.props.location.query,
        [obj]: val,
      },
    }));
  }
  render() {
    const { list, loading } = this.props;
    return (
      <Card title="课程列表" style={{ padding: 0, borderRadius: 0 }} bodyStyle={{ padding: 8 }}>
        <div className={styles.toolbar}>
          <span>
            <Search
              onSearch={this.handleGetDataByFilter.bind(this, 'keyword')}
              style={{ width: 150, marginRight: '15px' }}
              placeholder="根据课程名搜索"
            />
          </span>
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
  const { type } = state.user;
  return {
    list,
    type,
    loading: state.loading.models.course,
  };
}

export default connect(mapStateToProps)(CourseList);
