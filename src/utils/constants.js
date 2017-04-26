export const qiniuUrl = 'img.huarenmatch.com';

// leancloud
export const APP_ID = 'mO7qEgdANpFxcbQp5Y6XngEE-gzGzoHsz';
export const APP_KEY = 'kToCqzxCQFj4BBYnpL6WNH5q';

export const IDENTITYS = [{
  value: 'student',
  label: '学生',
}, {
  value: 'teacher',
  label: '教师',
}, {
  value: 'administrator',
  label: '管理员',
  children: [{
    value: 0,
    label: '普通管理员',
  }, {
    value: 1,
    label: '高级管理员',
  }],
}];

export const ROUTE_CONF = [
  {
    text: '首页',
    key: 'index',
    icon: 'home',
    url: '/index',
    sub: [{
      text: '首页',
      key: 'index',
      url: '/',
    }],
  }, {
    text: '课程管理',
    key: 'course',
    icon: 'book',
    url: '/course',
    sub: [{
      text: '课程列表',
      key: 'course/list',
      url: '/course/list',
      auth: 'course',
    }, {
      text: '添加课程',
      key: 'course/new',
      url: '/course/new',
      auth: 'course',
    }],
  }, {
    text: '用户管理',
    key: 'users',
    icon: 'user',
    url: '/users',
    sub: [{
      text: '用户列表',
      key: 'users/list',
      url: '/users/list',
      auth: 'users',
    }, {
      text: '添加用户',
      key: 'users/new',
      url: '/users/new',
      auth: 'users',
    }],
  }];
