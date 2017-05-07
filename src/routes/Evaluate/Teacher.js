import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import { Card, Table, Radio, Form, Input, Button } from 'antd';
import styles from './style.less';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

class Evaluate extends Component {
  constructor(props) {
    super(props);
    this.dataSource = [{
      key: '1',
      id: '1',
      name: 'xxx',
      course: 'xxx',
      status: '1',
    }];
    this.columns = [{
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      width: 50,
    }, {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '课程',
      dataIndex: 'course',
      key: 'course',
      render: course => <span>《{course}》</span>,
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: '操作',
      dataIndex: 'op',
      key: 'op',
      render: () => <a onClick={this.handelEvaluate}>评价</a>,
    }];
  }
  handelEvaluate = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/',
    }));
  }
  handleEvaluateChange = (e) => {
    console.log(e);
  }
  render() {
    return (
      <div className={styles.normal}>
        <Card title="课堂教学评估量表" style={{ padding: 0, borderRadius: 0 }} bodyStyle={{ padding: 8 }}>
          <Table size="small" pagination={false} bordered dataSource={this.dataSource} columns={this.columns} />
        </Card>
      </div>
    );
  }

}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Form.create()(Evaluate));
