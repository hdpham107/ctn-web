import React from "react";
import { Spin, Icon } from 'antd';

const CircularProgress = ({className, size}) => <div className={`loader ${className}`}>
  <Spin indicator={<Icon type="loading" style={{ fontSize: size ? size : 20 }} spin />} />
</div>;
export default CircularProgress;
