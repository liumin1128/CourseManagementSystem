import React from 'react';
import { connect } from 'dva';

function Manage() {
  return (
    <div>
      数据导入
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Manage);
