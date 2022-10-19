import React from "react";

import { Empty } from "antd";

const OCEmpty = (props) => {
  return (
    <Empty style={{ display: 'inline-block', verticalAlign: 'middle' }}
      image={props.image}
      imageStyle = { props.imageStyle }
      description={
        <span>
          {props.description}
        </span>
      }
    >
    </Empty>
  );
}
export default OCEmpty;