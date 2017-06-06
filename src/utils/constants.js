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

export const ROUTE_CONF = {
  administrator: [
    {
      text: '首页',
      key: 'index',
      icon: 'home',
      url: '/index',
      sub: [{
        text: '首页',
        key: 'index',
        url: '/home',
      }],
    }, {
      text: '课程管理',
      key: 'course',
      icon: 'book',
      url: '/course',
      sub: [{
        text: '课程列表',
        key: 'admin/course/list',
        url: '/admin/course/list',
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
        key: 'admin/manage',
        url: '/admin/manage',
        auth: 'admin',
      }, {
        text: '修改密码',
        key: 'user/changepw',
        url: '/user/changepw',
        auth: 'user',
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
    },
  ],
  student: [
    {
      text: '首页',
      key: 'index',
      icon: 'home',
      url: '/home',
      sub: [{
        text: '首页',
        key: 'home',
        url: '/home',
      }],
    }, {
      text: '教学相关',
      key: 'course',
      icon: 'book',
      url: '/course',
      sub: [{
        text: '课程列表',
        key: 'course/list',
        url: '/course/list',
        auth: 'course',
      }],
    }, {
      text: '系统设置',
      key: 'setting',
      icon: 'setting',
      url: '/setting',
      sub: [{
        text: '修改密码',
        key: 'user/changepw',
        url: '/user/changepw',
        auth: 'user',
      }],
    },
  ],
  teacher: [
    {
      text: '首页',
      key: 'index',
      icon: 'home',
      url: '/home',
      sub: [{
        text: '首页',
        key: 'home',
        url: '/home',
      }],
    }, {
      text: '教师相关',
      key: 'teacher',
      icon: 'book',
      url: '/teacher',
      sub: [{
        text: '我的成绩',
        key: 'teacher/achievement',
        url: '/teacher/achievement',
        auth: 'course',
      }],
    },
    {
      text: '系统设置',
      key: 'setting',
      icon: 'setting',
      url: '/setting',
      sub: [{
        text: '修改密码',
        key: 'user/changepw',
        url: '/user/changepw',
        auth: 'user',
      }],
    },
  ],
};

export const STUDENT_EVALUATE_TABLE = [{
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
