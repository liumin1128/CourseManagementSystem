import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import App from './routes/App.js';
import Error from './routes/Error.js';

import IndexPage from './routes/IndexPage';

import CourseList from './routes/CourseList.js';

import CourseNew from './routes/CourseNew.js';

import UsersList from './routes/UsersList.js';

import UsersNew from './routes/UsersNew.js';

import EvaluateStudent from './routes/Evaluate/Student';
import EvaluateExpert from './routes/Evaluate/Expert';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" breadcrumbName="后台" component={App} >
        <IndexRoute breadcrumbName="首页" component={IndexPage} />
        <Route breadcrumbName="课程列表" path="/course/list" component={CourseList} />
        <Route breadcrumbName="添加课程" path="/course/new" component={CourseNew} />
        <Route breadcrumbName="用户列表" path="/users/list" component={UsersList} />
        <Route breadcrumbName="添加列表" path="/users/new" component={UsersNew} />
        <Route breadcrumbName="添加列表" path="/users/new" component={UsersNew} />
        <Route breadcrumbName="学生评价" path="/evaluate/student" component={EvaluateStudent} />
        <Route breadcrumbName="督导组，专家，教师评价" path="/evaluate/expert" component={EvaluateExpert} />
      </Route>
      <Route path="*" component={Error} />
    </Router>
  );
}

export default RouterConfig;
