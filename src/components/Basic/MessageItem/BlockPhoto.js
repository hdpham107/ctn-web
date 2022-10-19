import React from 'react';
import _ from 'lodash';

export default function BlockPhoto(block) {
  const width = _.get(block, 'meta.width');
  const height = _.get(block, 'meta.height');
  if (!width) {
    return (<a href={block.content} target='_blank'>
      <img className='content-item image' src={block.content} />
    </a>);
  }
  var ratio = 200 / width;
  return (<a href={block.content} target='_blank'>
    <img className='content-item image' src={block.content} width={200} height={height * ratio} />
  </a>);
}