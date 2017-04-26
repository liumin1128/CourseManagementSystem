import React from 'react';
import { Table } from 'antd';
import keys from 'lodash/keys';
import findIndex from 'lodash/findIndex';
import styles from './index.less';

function MyTable({ dataSource, loading, keys: propKeys, columns: propColumns }) {
  function getColumns() {
    // 获取到数据源的键值数组
    const keyArr = propKeys || keys(dataSource[0]);
    // 匹配键值数组，根据默认值返回columns
    const columns = keyArr.map((i) => {
      // 如果存在主动设置的column，则直接返回，无需继续匹配
      if (propColumns) {
        const index = findIndex(propColumns, c => c.key === i);
        if (index !== -1) {
          return propColumns[index];
        }
      }
      // 根据键值类型，猜测columns
      switch (i) {
        case 'id':
          return {
            title: 'ID',
            dataIndex: i,
            key: i,
          };
        case 'title':
          return {
            title: '标题',
            dataIndex: i,
            key: i,
          };
        case 'content':
          return {
            title: '内容',
            dataIndex: i,
            key: i,
          };
        case 'status':
          return {
            title: '状态',
            dataIndex: i,
            key: i,
          };
        case 'createdAt':
          return {
            title: '时间',
            dataIndex: i,
            key: i,
          };
        case 'img':
          return {
            title: '图片',
            dataIndex: i,
            key: i,
            render: img => <img style={{ maxWidth: 200 }} src={img} alt="Banner图片" />,
          };
        case 'key':
          return {};
        default:
          return {
            title: i,
            dataIndex: i,
            key: i,
          };
      }
    });
    return columns;
  }
  const columns = getColumns();
  return (
    <div className={styles.normal}>
      <Table
        style={{ borderRadius: 0 }}
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        rowKey={record => record.id}
        pagination={false}
      />
    </div>
  );
}

export default MyTable;
