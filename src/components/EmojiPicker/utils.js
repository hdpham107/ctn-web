import emojis from './emoji.json';
import _ from 'lodash';

function getRecentlyUsedEmojiCookie() {
  const emojiList = _.find(document.cookie.split('; '), c => c.startsWith('oc_recently_used_emoji'));
  if (_.isNil(emojiList)) {
    return [];
  }
  let result = [];
  try {
    result = JSON.parse(emojiList.substring(23, emojiList.length));
  } catch (e) {
    return [];
  }
  result = _.filter(result, item => {
    return _.findIndex(emojis, c => c.codes === _.get(item, 'codes', '')) > -1;
  }, []);
  return _.slice(result, 0, 6);
}

function setRecentlyUsedEmojiCookie(emojis) {
  const ex = new Date();
  ex.setDate(ex.getDate() + 7);
  document.cookie = `oc_recently_used_emoji=${JSON.stringify(emojis)}; expires=${ex.toDateString()}`;
}

export default {
  getRecentlyUsedEmojiCookie,
  setRecentlyUsedEmojiCookie,
};
