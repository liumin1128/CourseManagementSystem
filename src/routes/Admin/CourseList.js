import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, Tooltip, Button, Popover, Tag, Input, message, Modal } from 'antd';
import { levelToGrade, levelToResult, getResult, getStr } from '../../utils/achievement.js';
import { STUDENT_EVALUATE_TABLE } from '../.././utils/constants.js';
import Table from '../../components/Ui/Table';
import styles from './CourseList.less';

const Search = Input.Search;
const confirm = Modal.confirm;

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
        <a onClick={this.getGrade.bind(this, record)}>查看成绩</a>
      </span>,
    }];
  }
  getGrade = (record) => {
    this.props.dispatch({
      type: 'course/getGradeByAdmin',
      payload: {
        id: record.id,
      },
      callback: ({ studentData, exportData }) => {
        console.log(exportData);
        console.log(studentData);
        const test = [];
        const testExport = [];
        studentData.map((i) => {
          i.level.map((j, index) => {
            if (j >= 3) {
              test.push({
                index,
                grade: j,
              });
            }
          });
        });
        exportData.map((i) => {
          i.level.map((j, index) => {
            if (j >= 3) {
              testExport.push({
                index,
                grade: j,
              });
            }
          });
        });
        console.log(test);
        const temp = studentData.map((i) => {
          return {
            sub: i.sub,
            grade: levelToResult(levelToGrade(i.level)),
          };
        });
        const tempExport = exportData.map((i) => {
          return {
            sub: i.sub,
            grade: levelToResult(levelToGrade(i.level)),
          };
        });
        function arrAverageNum2(arr) {
          const sum = eval(arr.join('+'));
          return ~~(sum / arr.length * 100) / 100;
        }
        function getResultNum(studentNum, exportNum) {
          console.log((studentNum * 0.65) + (exportNum * 0.35));
          return parseInt((studentNum * 0.65) + (exportNum * 0.35), 0);
        }
        confirm({
          title: studentData.length === 0 ? '未查询到结果！' : `该教师的最终成绩为：${getStr(getResult(studentData))}`,
          width: 700,
          content: studentData.length === 0 ? '该教师本学期没有教授任何课程或评课尚未开始' : <div className={styles.grade}>
            <h5><span>督导组成绩*0.35，学生评课成绩*0.65，该老师加权平均分:</span> <span>{getResultNum(getResult(studentData), getResult(exportData))}</span></h5>
            <h5><span>学生评分成绩单:</span> <span>平均成绩: {getResult(studentData)}</span></h5>
            <Table dataSource={temp} size="small" />
            <h5><span>学生评分较低的项目:</span> <span>低分总数：{test.length}</span></h5>
            <ul>
              {test.map((i) => {
                return (<li>
                  {i.grade === 3 ? <Tag color="cyan">一般</Tag> : <Tag color="red">较差</Tag>}
                  {STUDENT_EVALUATE_TABLE[i.index].standard}</li>);
              })}
            </ul>
            <h5><span>督导组评分成绩单:</span> <span>平均成绩: {parseInt(getResult(exportData), 0)}</span></h5>
            <Table dataSource={tempExport} size="small" />
            <h5><span>督导组评分较低的项目:</span> <span>低分总数：{testExport.length}</span></h5>
            <ul>
              {testExport.map((i) => {
                return (<li>
                  {i.grade === 3 ? <Tag color="cyan">一般</Tag> : <Tag color="red">较差</Tag>}
                  {STUDENT_EVALUATE_TABLE[i.index].standard}</li>);
              })}
            </ul>
            {/*
          */}
          </div>,
          onOk() {
          },
          onCancel() {},
        });
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
  selectHandler = (record) => {
    this.props.dispatch({
      type: 'course/select',
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
