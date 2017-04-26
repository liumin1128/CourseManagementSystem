import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import App from './routes/App.js';
import Error from './routes/Error.js';

import IndexPage from './routes/IndexPage';

import CourseList from './routes/CourseList.js';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" breadcrumbName="后台" component={App} >
        <IndexRoute breadcrumbName="首页" component={IndexPage} />
        <Route breadcrumbName="课程列表" path="/course/list" component={CourseList} />
      </Route>
      <Route path="*" component={Error} />
    </Router>
  );
}

export default RouterConfig;
