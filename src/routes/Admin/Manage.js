import React, { Component } from 'react';
import { Upload, message, Modal, Card, Button, Icon } from 'antd';
import { connect } from 'dva';
import { xlsx2Json } from '../../utils/common.js';
import Table from '../../components/Ui/Table';
import styles from './Manage.less';

const confirm = Modal.confirm;

class Manage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  beforeUploadStudent = (file) => {
    const that = this;
    xlsx2Json(file).then((data) => {
      this.setState({ data }, () => {
        confirm({
          title: '确定导入以下数据吗?',
          width: 700,
          content: <Table dataSource={this.state.data} size="small" />,
          onOk() {
            // return new Promise((resolve, reject) => {
            //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            // }).catch(() => console.log('Oops errors!'));
            that.props.dispatch({
              type: 'users/batchAdd',
              payload: {
                list: data.map((i) => {
                  return {
                    class: i.class,
                    username: i.studentId,
                    idNumber: i.idNumber,
                    nickName: i.name,
                    avatarUrl: 'http://om4lyr5bv.bkt.clouddn.com/user.svg',
                    type: 'student',
                    password: i.studentId.slice(i.studentId.length - 6, i.studentId.length),
                  };
                }),
              },
            });
            Modal.info({
              title: '操作成功！',
              onOk() {},
            });
          },
          onCancel() {},
        });
      });
    });
    return false;
  }
  beforeUploadTeacher = (file) => {
    const that = this;
    xlsx2Json(file).then((data) => {
      this.setState({ data }, () => {
        confirm({
          title: '确定导入以下数据吗?',
          content: <Table dataSource={this.state.data} size="small" />,
          onOk() {
            // return new Promise((resolve, reject) => {
            //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            // }).catch(() => console.log('Oops errors!'));
            that.props.dispatch({
              type: 'users/batchAdd',
              payload: {
                list: data.map((i) => {
                  return {
                    username: i.teacherId,
                    nickName: i.name,
                    avatarUrl: 'http://om4lyr5bv.bkt.clouddn.com/user.svg',
                    type: 'teacher',
                    password: i.teacherId.slice(i.teacherId.length - 6, i.teacherId.length),
                  };
                }),
              },
            });
            Modal.info({
              title: '操作成功！',
              onOk() {},
            });
          },
          onCancel() {},
        });
      });
    });
    return false;
  }
  beforeUploadExport = (file) => {
    const that = this;
    xlsx2Json(file).then((data) => {
      this.setState({ data }, () => {
        confirm({
          title: '确定导入以下数据吗?',
          content: <Table dataSource={this.state.data} size="small" />,
          onOk() {
            that.props.dispatch({
              type: 'course/exportevaluate',
              payload: {
                list: data.map((i) => {
                  return {
                    teacher: '5940803cf25545d39d1b67ef',
                    course: '5942072942aae720de430dfe',
                    level: i.level.split('，').map((i) => { return parseInt(i, 0); }),
                    sub: i.sub,
                  };
                }),
              },
            });
            Modal.info({
              title: '操作成功！',
              onOk() {},
            });
          },
          onCancel() {},
        });
      });
    });
    return false;
  }
  exportStudent = (type) => {
    this.props.dispatch({
      type: 'users/exportUser',
      payload: {
        params: {
          type,
        },
      },
    });
  }
  render() {
    const { data } = this.state;
    const { loading } = this.props;
    return (
      <div>
        <Card
          title="数据导入"
          style={{ padding: 0, borderRadius: 0, marginBottom: 16 }}
          // bodyStyle={{ padding: 8 }}
        >

          <div className={styles.flex}>
            <Upload beforeUpload={this.beforeUploadStudent}>
              <Button>
                <Icon type="upload" /> 导入学生数据
              </Button>
            </Upload>

            <Upload beforeUpload={this.beforeUploadTeacher}>
              <Button>
                <Icon type="upload" /> 导入教师数据
              </Button>
            </Upload>

            <Upload beforeUpload={this.beforeUploadExport}>
              <Button>
                <Icon type="upload" /> 导入评课成绩
              </Button>
            </Upload>

          </div>

        </Card>

        <Card
          title="数据导出"
          style={{ padding: 0, borderRadius: 0 }}
          // bodyStyle={{ padding: 8 }}
        >

          <div className={styles.flex}>
            <Button onClick={this.exportStudent.bind(this, 'student')}>
              <Icon type="upload" /> 导出学生数据
            </Button>

            <Button onClick={this.exportStudent.bind(this, 'teacher')}>
              <Icon type="upload" /> 导出教师数据
            </Button>

            <Button>
              <Icon type="upload" /> 导出评课成绩
            </Button>

          </div>

        </Card>
        <a href="" download="导出的数据.xlsx" id="hf" />
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Manage);
