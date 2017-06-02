import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, Tooltip, Button, Popover, Tag } from 'antd';
import Table from '../components/Ui/Table';
import styles from './CourseList.less';

class CourseList extends Component {
  constructor(props) {
    super(props);
    this.keys = ['name', 'desc', 'teacher', 'select', 'createdAt', 'op'];
    this.columns = [{
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
    }, {
      title: '选课状态',
      dataIndex: 'select',
      key: 'select',
      render: (select) => {
        return select ? <Tag color="green">已选</Tag> : <Tag color="purple">未选</Tag>;
      },
    }, {
      title: '授课老师',
      dataIndex: 'teacher',
      key: 'teacher',
      render: teacher => <Popover
        content={<div style={{ maxWidth: 300 }}>
          <ul>
            <li><img style={{ width: 100, height: 100 }} src={teacher && teacher.avatarUrl} alt="" /></li>
            <li>姓名：{teacher && teacher.nickName}</li>
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
        {/* <a onClick={this.edite.bind(this, record)}>编辑</a>*/}

        {
          this.props.type === 'administrator' ? <div>
            <a onClick={this.delHandler.bind(this, record)}>删除</a>
          </div> : <div>
            {record.select ?
              <a onClick={this.evaluateHandler.bind(this, record)}>评价</a> :
              <a onClick={this.selectHandler.bind(this, record)}>选课</a>
            }
          </div>
        }
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
  const { type } = state.user;
  return {
    list,
    type,
    loading: state.loading.models.course,
  };
}

export default connect(mapStateToProps)(CourseList);
