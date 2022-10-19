import React from "react";
import { Icon } from "antd";

const OCSpin = (props) => {
  return <Icon type="loading" style={{ fontSize: props.size || 24 }} spin />;
}
export default OCSpin;