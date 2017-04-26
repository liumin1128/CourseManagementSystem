import { preatyTime } from './common.js';

export const formatCourseList = (data) => {
  return data.map((i, index) => {
    return {
      ...i,
      key: i._id,
      id: i._id,
      createdAt: preatyTime(i.createdAt),
      updatedAt: preatyTime(i.updatedAt),
    };
  });
};
