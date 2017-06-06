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
          type: 'user/changepw',
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
            label="原密码"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 8 }}
          >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入原密码!' }],
            })(
              <Input />,
            )}
          </FormItem>
          <FormItem
            label="新密码"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 8 }}
          >
            {getFieldDecorator('newpassword', {
              rules: [{ required: true, message: '请输入新密码!' }],
            })(
              <Input />,
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
