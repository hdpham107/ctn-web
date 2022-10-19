import moment from 'moment';
import _ from 'lodash';
const DATE_FORMAT = 'DD/MM/YYYY';
const DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm';

export const utils = {
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  groupMessage,
  isScrollAtBottom,
}

function groupMessage(messages, context = {}) {
  const isConversationFacebookComment = context.isConversationFacebookComment;
  let all = [];
  let tmp = [];
  let lastAuthor;
  let lastAuthorFirstSet = false;
  let lastDate = null;
  let date;
  _.each(messages, (message, i) => {
    const type = _.get(message, 'type');
    const authorType = _.get(message, 'author.type')
    if (type === 'liveTyping' || (isConversationFacebookComment && authorType === 'visitor')) {
      all.push(tmp);
      all.push([message]);
      tmp = [];
      return;
    }
    const authorId = _.get(message, 'author.authorId');
    const contentType = _.get(message, 'blocks[0].contentType');
    if (contentType === 'form') {
      all.push(tmp);
      tmp = [];
      return;
    }
    date = moment(message.timestamps || message.createdAt).format(DATE_FORMAT);
    if (lastDate === null || lastDate !== date) {
      lastDate = date;
      if (!_.isEmpty(tmp)) {
        all.push(tmp);
      }
      all.push([{
        type: 'system',
        blocks: [{
          type: 'system',
          contentType: 'newDate',
          content: isYesterday(date) ? 'Hôm qua' : isToday(date) ? 'Hôm nay' : date,
        }]
      }]);
      tmp = [];
    }
    if (authorId !== lastAuthor) {
      if (!lastAuthorFirstSet) {
        lastAuthorFirstSet = true;
      } else {
        all.push(tmp);
      }
      tmp = [message];
    }
    else {
      if (message.type === 'system' && (contentType === 'csat/feedback' || contentType === 'csat/rating')) {
        const nextContentType = _.get(messages[i - 1], 'blocks[0].contentType');
        if (nextContentType !== contentType && (nextContentType === 'csat/feedback' || nextContentType === 'csat/rating')) {
          if (message.timestamps - messages[i - 1].timestamps <= 30 * 60 * 1000) {
            messages[i - 1].blocks.push(message.blocks[0]);
          } else {
            tmp.push(message);
          }
        } else {
          tmp.push(message);
        }
      } else {
        tmp.push(message);
      }
    }
    lastAuthor = authorId;
    if (i === messages.length - 1) {
      all.push(tmp);
    }
  });
  return all;
}


function isYesterday(date) {
  const yesterday = moment().subtract(1, 'day').format(DATE_FORMAT);
  return date === yesterday;
}

function isToday(date) {
  const today = moment().format(DATE_FORMAT);
  return date === today;
}

function isScrollAtBottom(e, snapshot) {
  if (_.isNil(e)) {
    return false
  }
  const scrollBottom = (e.scrollHeight - e.clientHeight);
  const scrollPos = e.scrollTop;
  let oldIsBottom;
  if (snapshot) {
    oldIsBottom = snapshot.oldScrollHeight - snapshot.oldScrollTop === e.clientHeight
  }
  return oldIsBottom || (scrollBottom <= 0) || (scrollPos === scrollBottom)
}