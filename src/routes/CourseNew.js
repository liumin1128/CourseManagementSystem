import React from 'react';
import { connect } from 'dva';
import { Form, Select, Input, Button } from 'antd';
import styles from './CourseNew.css';

const FormItem = Form.Item;
const Option = Select.Option;

class CourseNew extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch({
          type: 'course/add',
          payload: { ...values },
        });
      }
    });
  };
  handleSelectChange = (value) => {
    console.log(value);
    this.props.form.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { teachers } = this.props;
    return (
      <div className={styles.normal}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label="课程名称"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 8 }}
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入课程名称!' }],
            })(
              <Input />,
            )}
          </FormItem>
          <FormItem
            label="课程描述"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 8 }}
          >
            {getFieldDecorator('desc', {
              rules: [{ required: true, message: '请输入课程名称!' }],
            })(
              <Input />,
            )}
          </FormItem>
          <FormItem
            label="授课老师"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 8 }}
          >
            {getFieldDecorator('teacher', {
              rules: [{ required: true, message: '请选择授课老师!' }],
            })(
              <Select
                defaultValue="lucy"
                style={{ width: 120 }}
                // onChange={handleChange}
              >
                {
                  teachers && teachers.map(i =>
                    <Option key={i._id} value={i._id} style={{ display: 'flex', alignItems: 'center' }}>
                      <img style={{ width: 24, height: 24, marginRight: 10 }} src={i.avatarUrl} alt="" />
                      {i.nickName}
                    </Option>,
                  )
                }
              </Select>,
            )}
          </FormItem>
          <FormItem
            wrapperCol={{ span: 8, offset: 4 }}
          >
            <Button type="primary" htmlType="submit">
              确认提交
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { teachers } = state.course;
  return { teachers };
}

export default connect(mapStateToProps)(Form.create()(CourseNew));
