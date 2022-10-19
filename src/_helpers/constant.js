import _ from 'lodash';

export const constantHelpers = {
  FB_MESSENGER_PERMISSION: 'email,pages_messaging,manage_pages,pages_show_list',
  FB_COMMENT_PERMISSION: 'email,pages_messaging,manage_pages,publish_pages,pages_show_list',
  INBOX_PER_PAGE: 24,
  dataType: {
    string: {
      value: 'string',
      name: 'Văn bản',
    },
    number: {
      value: 'number',
      name: 'Số',
    },
    boolean: {
      name: 'Có/Không',
      value: 'boolean',
    },
    date: {
      name: 'Thời gian',
      value: 'date',
    },
    list: {
      value: 'list',
      name: 'Danh sách'
    }
  },
  permissions: {
    UPDATE_CUSTOM_FIELD: 'update_custom_field'
  }
}

export const CHANNEL_SOURCE = {
  FACEBOOK_COMMENT: 'facebookComment',
  FACEBOOK_MESSNGER: 'facebookMessenger',
  ZALO: 'zalo',
}

export const integration = {
  appType: {
    FACEBOOK_MESSENGER: 'facebook',
    FACEBOOK_COMMENT: 'facebookComment',
    ZALO: 'zalo',
    Vcall: 'vcall',
    WIDGET: 'widget',
  },
}