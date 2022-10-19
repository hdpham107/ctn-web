import React, { useState } from 'react';
import _ from 'lodash';
import { Popover, Button, Tooltip } from 'antd';

import emojis from './emoji.json';
import emojiUtils from './utils';

const emojiGroups = [
  { en: 'Smileys & Emotion', vi: 'Cảm xúc' },
  { en: 'People & Body', vi: 'Con người và cơ thể' },
  { en: 'Animals & Nature', vi: 'Động vật và thiên nhiên' },
  { en: 'Food & Drink', vi: 'Đồ ăn và đồ uống' },
  { en: 'Travel & Places', vi: 'Du lịch và địa điểm' },
  { en: 'Activities', vi: 'Hoạt động' },
  { en: 'Objects', vi: 'Đồ vật' },
  { en: 'Symbols', vi: 'Ký hiệu' },
  { en: 'Flags', vi: 'Cờ' }
];

function EmojiPicker({ placement, onSelect, buttonClassName, disabled, titleTooltip, placementTooltip }) {
  const [recentlyUsedEmojis, setRecentlyUsedEmojis] = useState(emojiUtils.getRecentlyUsedEmojiCookie());

  const selectEmoji = (emoji) => {
    onSelect(emoji.char);

    const newRecentlyUsedEmojis = _.slice(_.unionBy([{ codes: emoji.codes }], recentlyUsedEmojis, 'codes'), 0, 6);
    setRecentlyUsedEmojis(newRecentlyUsedEmojis);
    emojiUtils.setRecentlyUsedEmojiCookie(newRecentlyUsedEmojis);
  }

  return (
    <Popover
      content={(
        <div className="emoji-picker-wrapper">
          <EmojiList selectEmoji={selectEmoji} recentlyUsedEmojis={recentlyUsedEmojis} />
        </div>
      )}
      trigger="click"
      placement={placement || 'topRight'}
      overlayClassName={`emoji-picker-popover${disabled ? ' disabled' : ''}`}>
      <Tooltip title={titleTooltip || 'Emoji'} placement={placementTooltip || 'top'}>
        <Button className={buttonClassName || ''}>
          <img src="/images/icon-emoji.svg" />
        </Button>
      </Tooltip>
    </Popover>
  );
}

function EmojiList({ selectEmoji, recentlyUsedEmojis }) {
  let groupedEmoji = _.groupBy(emojis, emoji => emoji.group);
  let recentlyUsedEmojiList = _.reduce(recentlyUsedEmojis, (result, value, key) => {
    const emoji = _.find(emojis, c => c.codes === _.get(value, 'codes', ''));
    return !_.isNil(emoji) ? [...result, emoji] : result;
  }, []);

  return (
    <div className="emoji-picker-list-wrapper">
      {!_.isEmpty(recentlyUsedEmojiList) ? (
        <div key="Frequently Used" className="emoji-picker-group">
          <div className="emoji-picker-group-name">Gần đây</div>
          <div className="emoji-picker-list">
            {_.map(recentlyUsedEmojiList, emoji => (
              <div
                key={emoji.codes}
                className="emoji-icon"
                title={emoji.name}
                onClick={() => selectEmoji(emoji)}
              >
                {emoji.char}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {_.map(emojiGroups, group => {
        if (_.isNil(_.get(groupedEmoji, group.en))) {
          return null;
        }
        return (
          <div key={group.en} className="emoji-picker-group">
            <div className="emoji-picker-group-name">{group.vi}</div>
            <div className="emoji-picker-list">
              {_.map(groupedEmoji[group.en], emoji =>
                (<div
                  key={emoji.codes}
                  className="emoji-icon"
                  title={emoji.name}
                  onClick={() => selectEmoji(emoji)}>
                  {emoji.char}
                </div>)
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default EmojiPicker;
