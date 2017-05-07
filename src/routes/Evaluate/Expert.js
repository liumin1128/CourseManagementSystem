import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Table, Radio } from 'antd';
import styles from './style.less';

const RadioGroup = Radio.Group;

class Evaluate extends Component {
  constructor(props) {
    super(props);
    this.dataSource = [{
      key: '1',
      standard: '按时上课，精神饱满，讲课有热情。',
      weight: 0.5,
      address: '西湖区湖底公园1号',
    }, {
      key: '2',
      standard: '管理课堂，严格要求学生，课堂秩序良好。',
      weight: 0.5,
      address: '西湖区湖底公园1号',
    }, {
      key: '3',
      standard: '观点正确，讲授准确，内容深广度符合教学大纲要求，信息量适度。',
      weight: 1.0,
      address: '西湖区湖底公园1号',
    }, {
      key: '4',
      standard: '理论与实际联系紧密，注意介绍学科研究的新成果、新进展。',
      weight: 1.0,
      address: '西湖区湖底公园1号',
    }, {
      key: '5',
      standard: '阐述问题思路清晰，条理清楚，重点突出。',
      weight: 1.5,
      address: '西湖区湖底公园1号',
    }, {
      key: '6',
      standard: '启发式教学，方法奏效，能调动学生的积极性，课堂气氛活跃。',
      weight: 1.5,
      address: '西湖区湖底公园1号',
    }, {
      key: '7',
      standard: '语言表达流利、生动，言简意赅，声音清亮',
      weight: 1.0,
      address: '西湖区湖底公园1号',
    }, {
      key: '8',
      standard: '板书适度，文图布局得当，字迹清楚/多媒体手段运用合理得当。',
      weight: 1.0,
      address: '西湖区湖底公园1号',
    }, {
      key: '9',
      standard: '学生能掌握主要的知识和技能。',
      weight: 1.0,
      address: '西湖区湖底公园1号',
    }, {
      key: '10',
      standard: '能给予学生思考、联想、创新的启迪。',
      weight: 1.0,
      address: '西湖区湖底公园1号',
    }];

    this.columns = [{
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      width: 50,
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
      render: () => <RadioGroup onChange={this.handleEvaluateChange}>
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </RadioGroup>,
    }];
  }
  handleEvaluateChange = (e) => {
    console.log(e);
  }
  render() {
    const columnsTitle = [{
      title: '任课教师',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '职称',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '所属部门',
      dataIndex: 'department',
      key: 'department',
    }, {
      title: '课程名称',
      dataIndex: 'courseName',
      key: 'courseName',
    }, {
      title: '专业年级班次',
      dataIndex: 'majorAgeClass',
      key: 'majorAgeClass',
    }, {
      title: '中心题目',
      dataIndex: 'topic',
      key: 'topic',
    }, {
      title: '听课时间',
      dataIndex: 'time',
      key: 'time',
    }, {
      title: '教室',
      dataIndex: 'room',
      key: 'room',
    }];

    const dataSourceTitle = [];
    return (
      <div className={styles.normal}>
        <Card
          title="课堂教学评估量表"
          style={{ padding: 0, borderRadius: 0 }} bodyStyle={{ padding: 8 }}
        >
          <Table style={{ borderRadius: 0 }} pagination={false} bordered dataSource={dataSourceTitle} columns={columnsTitle} />
          <Table style={{ borderRadius: 0 }} pagination={false} bordered dataSource={this.dataSource} columns={this.columns} />
        </Card>
      </div>
    );
  }

}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Evaluate);
