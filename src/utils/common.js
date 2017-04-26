
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
    case 'administrator': return ['管理员', '高级管理员'][grade];
    default: return '身份异常';
  }
};

export const type2status = (type, grade) => {
  switch (type) {
    case 'student': return 'default';
    case 'teacher': return 'warning';
    case 'administrator': return ['success', 'error'][grade];
    default: return 'processing';
  }
};
