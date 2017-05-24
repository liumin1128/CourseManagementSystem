import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Table, Radio, Form, Input, Button } from 'antd';
import styles from './style.less';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

class Evaluate extends Component {
  constructor(props) {
    super(props);
    this.dataSource = [{
      key: '0',
      standard: '能理解、关心、尊重全体学生，公平、公正对待全体学生，对学生有耐心，能正确引学生，教书育人导,为人师表',
      weight: 1.0,
      address: '西湖区湖底公园1号',
    }, {
      key: '1',
      standard: '有较强的事业心和较高的教学热情，授课态度认真负责，能认真组织课堂教学，维护课堂纪律,对学生要求严格',
      weight: 0.9,
      address: '西湖区湖底公园1号',
    }, {
      key: '2',
      standard: '备课充分，对课程内容掌握娴熟，能合理规划上课时间，讲授内容充实，不讲与所授课程及教书育人无关的内容',
      weight: 1.0,
      address: '西湖区湖底公园1号',
    }, {
      key: '3',
      standard: '讲课思路清晰，条理清楚，重点突出，理论联系实际，能在课程教学环节适当介绍本学科、本领域研究的新成果、新进展',
      weight: 1.2,
      address: '西湖区湖底公园1号',
    }, {
      key: '4',
      standard: '能够根据专业特点,采取合适的授课方法，易于大多数学生理解与接受,不照本宣科,能够调动学生的积极性,课堂气氛活跃',
      weight: 1.2,
      address: '西湖区湖底公园1号',
    }, {
      key: '5',
      standard: '讲课语言表达流利生动，言简意赅，声音清亮，语速适中',
      weight: 1.0,
      address: '西湖区湖底公园1号',
    }, {
      key: '6',
      standard: '采用黑板教学时，板书适度，文图布局得当，字迹清楚；采用多媒体教学时，课件运用熟练，有助于学生学习，教学效果好',
      weight: 0.9,
      address: '西湖区湖底公园1号',
    }, {
      key: '7',
      standard: '重视与学生交流，指导学习方法，鼓励学生独立思考，表达自己的见解',
      weight: 0.9,
      address: '西湖区湖底公园1号',
    }, {
      key: '8',
      standard: '认真对待学生的作业,及时、认真批改，不应付了事。能够认真对待学生提出的问题，耐心解答学生疑问',
      weight: 1.0,
      address: '西湖区湖底公园1号',
    }, {
      key: '9',
      standard: '严格遵守教学工作纪律，不迟到、不提前下课，课上不接打电话等',
      weight: 0.9,
      address: '西湖区湖底公园1号',
    }];
    this.columns = [{
      title: '序号',
      dataIndex: 'key',
      key: 'key',
    }, {
      title: '评估指标',
      dataIndex: 'standard',
      key: 'standard',
    // }, {
    //   title: '权重',
    //   dataIndex: 'weight',
    //   key: 'weight',
    }, {
      title: '评估等级',
      dataIndex: 'a1',
      key: 'a1',
      width: 300,
      render: (all, record) => <FormItem
        hasFeedback
      >
        {this.props.form.getFieldDecorator(`level.${record.key}`, {
          rules: [{
            required: true, message: '请选择您的评价！',
          }],
        })(
          <RadioGroup style={styles.radio} onChange={this.handleEvaluateChange}>
            <Radio value={1}>好</Radio>
            <Radio value={2}>较好</Radio>
            <Radio value={3}>一般</Radio>
            <Radio value={4}>较差</Radio>
          </RadioGroup>,
              )}
      </FormItem>,
    }];
  }
  handleEvaluateChange = (e) => {
    // console.log(e);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        this.props.dispatch({
          type: 'course/evaluate',
          payload: {
            ...values,
          },
        });
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.normal}>
        <Form onSubmit={this.handleSubmit}>
          <Card title="课堂教学评估量表" style={{ padding: 0, borderRadius: 0 }} bodyStyle={{ padding: 8 }}>
            <Table size="small" pagination={false} bordered dataSource={this.dataSource} columns={this.columns} />
          </Card>
          <Card title="主观评价" style={{ padding: 0, borderRadius: 0, marginTop: 16 }} bodyStyle={{ padding: 8 }}>
            <FormItem
              hasFeedback
            >
              {getFieldDecorator('sub', {
                rules: [{
                  required: true, message: '主观评价不能为空!',
                }],
              })(
                <Input />,
              )}
            </FormItem>
            <Button type="primary" htmlType="submit" size="large">完成</Button>
          </Card>
        </Form>

      </div>
    );
  }

}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Form.create()(Evaluate));
