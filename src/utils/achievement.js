export const levelToGrade = (level) => {
  return level.map((i) => {
    switch (i) {
      case 1:return 100;
      case 2: return 80;
      case 3: return 70;
      case 4: return 60;
      default: return 60;
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
  if (num >= 900) {
    return '优秀';
  } else if (num >= 800) {
    return '良好';
  } else if (num >= 700) {
    return '中等';
  } else if (num >= 600) {
    return '及格';
  } else {
    return '不及格';
  }
};
