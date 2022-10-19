import React from 'react';
import _ from 'lodash';
import { Tooltip } from 'antd';

export default function BlockVideo(block, context = {}) {
  const disableOpen = context.disableOpen;
  const thumbnail = _.get(block, 'meta.thumbnail');
  if (block.meta && thumbnail) {
    const width = _.get(block, 'meta.width');
    const height = _.get(block, 'meta.height');
    if (!width) {
      return (
        <Tooltip title="Nhấn vào link để xem video">
          <a onClick={() => openVideo(block.content, disableOpen)} className='file-attachment video' target='_blank'>
            <img className='content-item image' src={block.thumbnail} />
          </a>
        </Tooltip>);
    }
    var ratio = 200 / width;
    return (
      <Tooltip title="Nhấn vào link để xem video">
        <a onClick={() => openVideo(block.content, disableOpen)} className='file-attachment video' target='_blank'>
          <img className='content-item image' src={thumbnail} width={200} height={height * ratio} />
        </a>
      </Tooltip>
    );
  }
  return (
    <Tooltip title="Nhấn vào link để xem video">
      <a onClick={() => openVideo(block.content, disableOpen)} className='file-attachment video' target='_blank'>
        <img src='/images/icon-video.svg' />
        <span>{block.content}</span>
      </a>
    </Tooltip>
  )
}

function openVideo(url, disable) {
  if (disable) {
    return;
  }
  window.open(url, "_blank");
}