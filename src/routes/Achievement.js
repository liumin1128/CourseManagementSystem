import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, Tooltip, Button, Popover, Tag } from 'antd';
import Table from '../components/Ui/Table';
import styles from './CourseList.less';

const levelToGrade = (level) => {
  return level.map((i) => {
    switch (i) {
      case 1:return 100;
      case 2: return 80;
      case 3: return 70;
      case 4: return 60;
      default: return 60;
    }
  });
};

const levelToResult = (data) => {
  let temp = 0;
  const width = [0.5, 0.5, 1, 1, 1.5, 1.5, 1, 1, 1, 1];
  data.map((i, index) => {
    temp += data[index] * width[index];
  });
  return temp;
};

const getResult = (achievement) => {
  let result = 0;
  achievement.map((i) => {
    result += levelToResult(levelToGrade(i.level));
  });
  result /= achievement.length;
  return result;
};

const getStr = (num) => {
  if (num >= 900) {
    return '优秀';
  } else if (num >= 800) {
    return '良好';
  } else if (num >= 700) {
    return '中等';
  } else if (num >= 600) {
    return '及格';
  } else {
    return '不及格';
  }
};

class CourseList extends Component {
  constructor(props) {
    super(props);
    this.keys = ['name', 'desc', 'result', 'createdAt', 'op'];
    this.columns = [{
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
    }, {
      title: '成绩',
      dataIndex: 'achievement',
      key: 'result',
      render: achievement => <div>
        {/* {achievement.map(i =>
          <div key={i._id}>
            <p>评分结果： {i.level.join('-')}</p>
            <p>换成分数： { i.level && levelToGrade(i.level)}</p>
            <p>换成分数： { i.level && levelToResult(levelToGrade(i.level))}</p>
          </div>,
        )}
        平均成绩：{getResult(achievement)}*/}
        {getStr(getResult(achievement))}
      </div>,
    }, {
      title: '评分结果',
      dataIndex: 'achievement',
      key: 'achievement',
      render: achievement => <div>
        {achievement.map(i =>
          <div key={i._id}>
            <p>{i.level.join('-')}</p>
            <p>{i.sub}</p>
          </div>,
        )}
      </div>,
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
  const { list } = state.achievement;
  const { type } = state.user;
  return {
    list,
    type,
    loading: state.loading.models.course,
  };
}

export default connect(mapStateToProps)(CourseList);
