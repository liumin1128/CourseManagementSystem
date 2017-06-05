import React from 'react';
import { Card, Form, Input, Button } from 'antd';
import { connect } from 'dva';

import logoIcon from '../assets/logo.jpg';
import styles from './Sign.less';

import Drag from '../components/Ui/Drag';

const FormItem = Form.Item;

const NormalLoginForm = ({
  dispatch,
  loading,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      dispatch({
        type: 'user/login',
        payload: values,
      });
      // dispatch({
      //   type: 'users/fetch',
      //   payload: values,
      // });
    });
  }

  return (
    <div className={styles.normal}>
      <div className={styles.bg} />
      <Card
        className={styles.box}
          // title="欢迎登录-华人地产管理后台"
        bordered={false}
        style={{ maxWidth: 350 }}
      >
        <div className={styles.logo}><img src={logoIcon} alt="" /></div>
        <form>
          <FormItem hasFeedback>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '请填写用户名',
                },
              ],
            })(<Input size="large" onPressEnter={handleOk} placeholder="用户名" />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请填写密码',
                },
              ],
            })(<Input size="large" type="password" onPressEnter={handleOk} placeholder="密码" />)}
          </FormItem>

          <Drag />
          <Button style={{ width: '100%' }} type="primary" size="large" onClick={handleOk} loading={loading}>
            登录
          </Button>
        </form>
      </Card>
    </div>
  );
};

function mapStateToProps(state) {
  // const { list, total, page } = state.users;
  return {
    loading: state.loading.models.user,
  };
}

export default connect(mapStateToProps)(Form.create()(NormalLoginForm));
