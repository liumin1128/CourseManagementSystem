import React from 'react';
import { connect } from 'dva';
import { Form, Select, Input, Button } from 'antd';
import styles from './CourseNew.css';

const FormItem = Form.Item;
const Option = Select.Option;

class CourseNew extends React.Component {
  state = {
    teachers: [{
      _id: '590ec0429c6c3b0cb82f24df',
      nickName: '刘老师',
      username: 'liumin',
      password: '123456',
      avatarUrl: 'http://om4lyr5bv.bkt.clouddn.com/user.svg',
      __v: 0,
      updatedAt: '2017-05-07T06:35:46.823Z',
      createdAt: '2017-05-07T06:35:46.823Z',
      grade: 0,
      type: 'teacher',
    }, {
      _id: '590ec34a9c6c3b0cb82f24e0',
      nickName: '梁老师',
      username: 'ldy',
      password: '123456',
      avatarUrl: 'http://om4lyr5bv.bkt.clouddn.com/avatar.png',
      __v: 0,
      updatedAt: '2017-05-07T06:48:42.184Z',
      createdAt: '2017-05-07T06:48:42.184Z',
      grade: 0,
      type: 'teacher',
    }],
  }
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
    const { teachers } = this.state;
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
                  teachers.map(i =>
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

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Form.create()(CourseNew));
