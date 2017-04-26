
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
