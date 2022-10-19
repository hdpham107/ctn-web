export const getFewContent = (content = '', numberOfWords = 10) => {
  const str = `${content.split(/\s+/).slice(0, numberOfWords).join(' ')}`;
  return str.length > 50 ? str.substr(0, 50) : str;
};
export const getFewContentFromHTML = (content = '', numberOfWords = 10) => {
  content = content.replace(/<(?:.|\n)*?>/gm, '');
  const str = `${content.split(/\s+/).slice(0, numberOfWords).join(' ')}`;
  return str.length > 50 ? str.substr(0, 50) : str;
};
export const pad =
  (value,
   length) => (
    (value.toString().length < length) ?
      pad(`0${value}`, length
      )
      : value
  );

export const getDirByTime = (strISODate) => {
  const dateObj = new Date(strISODate);
  const year = dateObj.getUTCFullYear();
  const month = dateObj.getUTCMonth() + 1; // months from 1-12
  const day = dateObj.getUTCDate();
  const strYear = pad(year, 4);
  const srtMonth = pad(month, 2);
  const srtDay = pad(day, 2);
  return `${strYear}/${srtMonth}/${srtDay}`;
};

export default getFewContent;
