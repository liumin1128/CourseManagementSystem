export const qiniuUrl = 'img.huarenmatch.com';

// leancloud
export const APP_ID = 'mO7qEgdANpFxcbQp5Y6XngEE-gzGzoHsz';
export const APP_KEY = 'kToCqzxCQFj4BBYnpL6WNH5q';

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
  }];
