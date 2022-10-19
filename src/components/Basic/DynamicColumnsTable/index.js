import React from 'react';
import { Table } from 'antd';
import { calculateColumnsWidth } from "./helpers";

const DynamicColumnsTable = props => {
  const dataTable = calculateColumnsWidth(props.columns, props.dataSource, 300);

  return (
    <Table {...props }
      scroll={{ x: dataTable.tableWidth, y: 500 }}
    />
  );
};

export default DynamicColumnsTable;