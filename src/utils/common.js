import { routerRedux } from 'dva/router';
import XLSX from 'xlsx';
import { message } from 'antd';
import request from './request';
import { app } from '../index.js';

export const xlsx2Json = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (e) => {
      const data = e.target.result;
      const temp = XLSX.read(data, {
        type: 'binary',
      });
      const result = XLSX.utils.sheet_to_json(temp.Sheets[temp.SheetNames[0]]);
      resolve(result);
    };
  });
};

export const notEmpty = (obj, label) => {
  return new Promise((resolve, reject) => {
  });
};

export const preatyTime = (str) => {
  if (str) {
    const data = new Date(str);
    if (data) {
      return `${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;
    } else {
      return '未知';
    }
  } else {
    return '';
  }
};

export const hideMoreString = (str, length) => {
  const s = str || '';
  const l = length || 15;
  if (s.length > l) {
    return `${str.substring(0, l)}...`;
  } else {
    return str;
  }
};

export const getIndentity = (type, grade) => {
  switch (type) {
    case 'student': return '学生';
    case 'teacher': return '老师';
    case 'expert': return '督导组专家';
    case 'administrator': return ['管理员', '高级管理员'][grade];
    default: return '身份异常';
  }
};

export const type2status = (type, grade) => {
  switch (type) {
    case 'student': return 'default';
    case 'teacher': return 'warning';
    case 'expert': return 'warning';
    case 'administrator': return ['success', 'error'][grade];
    default: return 'processing';
  }
};

export const myRequest = ({ payload, method }) => {
  if (window.localStorage) {
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      app._store.dispatch(routerRedux.push({
        pathname: '/',
      }));
      message.error('用户未登录');
    } else {
      return {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method,
        body: JSON.stringify({ ...payload, token }),
      };
    }
  } else {
    message.error('浏览器不支持localStorage');
  }
};

export const fetch = (url, payload, method = 'POST') => {
  return request(url, myRequest({ payload, method }));
};
