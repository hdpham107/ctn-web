import React from 'react';

import { Tooltip } from 'antd';

function SortIcon(props) {
  return (
    <Tooltip
      placement={props.placement || "right"}
      title="Giữ và kéo để sắp xếp">
      <span className="action-sort"></span>
    </Tooltip>
  );
}

export default SortIcon;
