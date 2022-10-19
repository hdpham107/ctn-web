const tableNames = {
  conversations: 'conversations',
  live: 'live',
  messages: 'messages',
  liveTypingMessages: 'liveTypingMessages',
  visitors: 'visitors',
  groups: 'groups',
  campaigns: 'campaigns',
  agents: 'agents',
  userNotes: 'userNotes',
  thirdIntegrations: 'thirdIntegrations',
  routingRules: 'routingRules',
  labels: 'labels',
  customBots: 'customBots',
  userSegments: 'userSegments',
  customBotTemplates: 'customBotTemplates',
};

const actionNames = {
  DATABASE_WRITE: 'DATABASE_WRITE',
  DATABASE_UPDATE: 'DATABASE_UPDATE',
  DATABASE_UPDATE_MANY: 'DATABASE_UPDATE_MANY',
  DATABASE_UPSERT: 'DATABASE_UPSERT',
};

export {
  tableNames,
  actionNames,
};
