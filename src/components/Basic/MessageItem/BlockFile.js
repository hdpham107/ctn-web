import React from 'react';
import { Tooltip } from 'antd';

export default function BlockFile(block) {
  return (
    <Tooltip title="Tải về">
      <a href={block.content} className='file-attachment' target='_blank'>
        <img className='file-attachment-icon' src='/images/icon-attachment.png' />
        <span>{block.name || block.content}</span>
      </a>
    </Tooltip>
  )
}