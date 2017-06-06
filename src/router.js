import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import App from './routes/App.js';
import Error from './routes/Error.js';

import IndexPage from './routes/IndexPage';
import CourseList from './routes/CourseList.js';
import CourseNew from './routes/CourseNew.js';
import UsersList from './routes/UsersList.js';
import UsersNew from './routes/UsersNew.js';
import Sign from './routes/Sign.js';
import EvaluateStudent from './routes/Evaluate/Student';
import EvaluateTeacher from './routes/Evaluate/Teacher';
import EvaluateCourse from './routes/Evaluate/Course';
import EvaluateExpert from './routes/Evaluate/Expert';

import AdminCourseList from './routes/Admin/CourseList';
import Manage from './routes/Admin/Manage';
import ChangePw from './routes/ChangePw';

import Teacher from './routes/Teacher';
import Achievement from './routes/Achievement';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route breadcrumbName="登录页" path="/" component={Sign} />
      {/* <Route breadcrumbName="登录页" path="/sign" component={Sign} />*/}
      <Route path="/" breadcrumbName="后台" component={App} >
        <IndexRoute breadcrumbName="首页" component={IndexPage} />
        <Route breadcrumbName="首页" path="/home" component={IndexPage} />
        <Route breadcrumbName="课程列表" path="/admin/course/list" component={AdminCourseList} />
        <Route breadcrumbName="课程列表" path="/admin/manage" component={Manage} />
        <Route breadcrumbName="课程列表" path="/course/list" component={CourseList} />
        <Route breadcrumbName="添加课程" path="/course/new" component={CourseNew} />
        <Route breadcrumbName="用户列表" path="/users/list" component={UsersList} />
        <Route breadcrumbName="添加列表" path="/users/new" component={UsersNew} />
        <Route breadcrumbName="添加列表" path="/users/new" component={UsersNew} />
        <Route breadcrumbName="待评价教师列表" path="/evaluate/teacher" component={EvaluateTeacher} />
        <Route breadcrumbName="待评价课程" path="/evaluate/course" component={EvaluateCourse} />
        <Route breadcrumbName="学生评价" path="/evaluate/student" component={EvaluateStudent} />
        <Route breadcrumbName="督导组，专家，教师评价" path="/evaluate/expert" component={EvaluateExpert} />
        <Route breadcrumbName="教师主页" path="/teacher" component={Teacher} />
        <Route breadcrumbName="教师主页" path="/teacher/achievement" component={Achievement} />
        <Route breadcrumbName="修改密码" path="/user/changepw" component={ChangePw} />
      </Route>
      <Route path="*" component={Error} />
    </Router>
  );
}

export default RouterConfig;
