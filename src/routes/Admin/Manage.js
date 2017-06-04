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
                    password: i.studentId.slice(i.studentId.length - 7, i.studentId.length),
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
          width: 1000,
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
                    username: i.id,
                    nickName: i.name,
                    avatarUrl: 'http://om4lyr5bv.bkt.clouddn.com/user.svg',
                    type: 'teacher',
                    password: i.id.slice(i.id.length - 7, i.id.length),
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
  render() {
    const { data } = this.state;
    const { loading } = this.props;
    return (
      <div>
        <Card
          title="数据导入"
          style={{ padding: 0, borderRadius: 0 }}
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

            <Upload beforeUpload={this.beforeUploadStudent}>
              <Button>
                <Icon type="upload" /> 导入课程数据
              </Button>
            </Upload>
          </div>

        </Card>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Manage);
