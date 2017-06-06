export const levelToGrade = (level) => {
  return level.map((i) => {
    switch (i) {
      case 1:return 10;
      case 2: return 8;
      case 3: return 7;
      case 4: return 6;
      default: return 6;
    }
  });
};

export const levelToResult = (data) => {
  let temp = 0;
  const width = [0.5, 0.5, 1, 1, 1.5, 1.5, 1, 1, 1, 1];
  data.map((i, index) => {
    temp += data[index] * width[index];
  });
  return temp;
};

export const getResult = (achievement) => {
  let result = 0;
  achievement.map((i) => {
    result += levelToResult(levelToGrade(i.level));
  });
  result /= achievement.length;
  return result;
};

export const getStr = (num) => {
  if (num >= 90) {
    return '优秀';
  } else if (num >= 80) {
    return '良好';
  } else if (num >= 70) {
    return '中等';
  } else if (num >= 60) {
    return '及格';
  } else {
    return '不及格';
  }
};
