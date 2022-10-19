import React from 'react';
import _ from 'lodash';

import { utilHelpers, decodeHtmlEntitiesSupport } from '../../../_helpers';

export default function BlockTextHtml(block) {
  let formattedMessage = utilHelpers.formatMessage(block.content);
  formattedMessage = utilHelpers.encodeMessageText(formattedMessage);
  formattedMessage = decodeHtmlEntitiesSupport(formattedMessage);
  formattedMessage = utilHelpers.createTextLinks(formattedMessage);
  return <span className='content-item'
    dangerouslySetInnerHTML={{ __html: formattedMessage }} />
}