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

function s2ab(s) { // 字符串转字符流
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}
            // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
function getCharCol(n) {
  let temCol = '',
    s = '',
    m = 0;
  while (n > 0) {
    m = n % 26 + 1;
    s = String.fromCharCode(m + 64) + s;
    n = (n - m) / 26;
  }
  return s;
}

export const json2xlsx = (json, type) => {
  const keyMap = [];// 获取键
  for (const k in json[0]) {
    keyMap.push(k);
  }
  const tmpdata = [];// 用来保存转换好的json
  json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
    v: v[k],
    position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1),
  }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
    v: v.v,
  });
  const outputPos = Object.keys(tmpdata); // 设置区域,比如表格从A1到D10
  const tmpWB = {
    SheetNames: ['mySheet'], // 保存的表标题
    Sheets: {
      mySheet: Object.assign({},
                            tmpdata, // 内容
        {
          '!ref': `${outputPos[0]}:${outputPos[outputPos.length - 1]}`, // 设置填充区域
        }),
    },
  };
  const tmpDown = new Blob([s2ab(XLSX.write(tmpWB,
                    { bookType: (type == undefined ? 'xlsx' : type), bookSST: false, type: 'binary' }, // 这里的数据是用来定义导出的格式类型
                    ))], {
                      type: '',
                    }); // 创建二进制对象写入转换好的字节流
  const href = URL.createObjectURL(tmpDown); // 创建对象超链接
  document.getElementById('hf').href = href; // 绑定a标签
  document.getElementById('hf').click(); // 模拟点击实现下载
  setTimeout(() => { // 延时释放
    URL.revokeObjectURL(tmpDown); // 用URL.revokeObjectURL()来释放这个object URL
  }, 100);
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
