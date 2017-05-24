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
  value: 'expert',
  label: '督导组专家',
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
  }, {
    text: '教学评价',
    key: 'evaluate',
    icon: 'calendar',
    url: '/evaluate',
    sub: [{
      text: '学生评价',
      key: 'evaluate/student',
      url: '/evaluate/student',
      auth: 'evaluate',
    }, {
      text: '待评价老师',
      key: 'evaluate/teacher',
      url: '/evaluate/teacher',
      auth: 'evaluate',
    }, {
      text: '待评价课程',
      key: 'evaluate/course',
      url: '/evaluate/course',
      auth: 'evaluate',
    }, {
      text: '督导组评价',
      key: 'evaluate/expert',
      url: '/evaluate/expert',
      auth: 'evaluate',
    }],
  }, {
    text: '系统设置',
    key: 'setting',
    icon: 'setting',
    url: '/setting',
    sub: [{
      text: '系统设置',
      key: 'setting/student',
      url: '/setting/student',
      auth: 'setting',
    }, {
      text: '参数设置',
      key: 'setting/expert',
      url: '/setting/expert',
      auth: 'setting',
    }],
  }, {
    text: '教师相关',
    key: 'teacher',
    icon: 'teacher',
    url: '/teacher',
    sub: [{
      text: '我的主页',
      key: 'teacher/index',
      url: '/teacher/index',
      auth: 'teacher',
    }],
  }];
