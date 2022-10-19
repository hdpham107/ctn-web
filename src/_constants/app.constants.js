export const appConstants = {
  APP_LOAD: 'APP_LOAD',
  CHANGE_PAGE: 'CHANGE_PAGE',
  APP_LOAD_AGENT: 'APP_LOAD_AGENT',
  APP_CHOOSED: 'APP_CHOOSED',

  SHOW_INFO_VISITOR: 'SHOW_INFO_VISITOR',
  CHANGE_SHOW_SUCCESS: 'CHANGE_SHOW_SUCCESS',
};

export const mainAppHeaderHeight = 55;

export const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

export const emoticonRegexList = [
  { regex: "(:\\)|:-\\)|=\\))", emoji: '🙂' },
  { regex: "(:\\(|:-\\(|=\\()", emoji: '🙁' },
  { regex: "(:\\||:-\\|)", emoji: '😐' },
  { regex: "(:[Dd]|:-[Dd]|=[Dd])", emoji: '😀' },
  { regex: "(;\\)|;-\\))", emoji: '😉' },
  { regex: "(:\\'\\(|:\\'-\\()", emoji: '😢' },
  { regex: "(:[oO]|:-[oO])", emoji: '😮' },
  { regex: "([B8]\\)|[B8]-\\))", emoji: '😎' },
  { regex: "(:[pP]|:-[pP]|=[pP])", emoji: '😛' },
  { regex: "(:[\\\\\\/]|:-[\\\\\\/]|=[\\\\\\/])", emoji: '😕' },
  { regex: "(<[3])", emoji: '❤️' },
  { regex: "(\\([yY]\\))", emoji: '👍' },
  { regex: "(:\\*|:-\\*)", emoji: '😘' },
  { regex: "(-_-)", emoji: '😑' },
  { regex: "(\\^_\\^)", emoji: '😊' },
  { regex: "(>:\\()", emoji: '😠' },
  { regex: "([Oo0]:\\)|[Oo0]:-\\))", emoji: '😇' },
  { regex: "([3]:\\)|[3]:-\\))", emoji: '😈' },
  { regex: "(:poop:)", emoji: '💩' },
  { regex: "(<\\(\"\\))", emoji: '🐧' },
];
