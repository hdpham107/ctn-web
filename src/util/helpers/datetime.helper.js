import moment from 'moment';
// import momentt from 'moment-timezone';
// momentt().tz("Asia/Ho_Chi_Minh").format();

// import { workingTimes } from '../../constants';

// moment.locale('vi');
// export const check = (time) => {
//   const momentTime = moment(time);
//   const weekDay = momentTime.weekday();
//   let result = false;
//   if (weekDay < 6) { // not weekend
//     const hour = momentTime.hour();
//     const minute = momentTime.minute();
//     const currentMinute = (hour * 60) + minute;
//     workingTimes.map((workingTime) => {
//       const startMinute = (workingTime.start.h * 60) + workingTime.start.m;
//       const endMinute = (workingTime.end.h * 60) + workingTime.end.m;
//       if (currentMinute >= startMinute && currentMinute <= endMinute) {
//         result = true;
//         return workingTime;
//       }
//       return workingTime;
//     });
//   }
//   return result;
// };
// export const calculate = (duration) => {
//   const startTime = moment();
//   let endTime = startTime;
//   const step = 5;
//   while (duration > 0) {
//     endTime = endTime.add(step, 'minute');
//     if (check(endTime)) {
//       duration -= step;
//     }
//   }
//   return endTime.toISOString();
// };

export const echoDateTime = (date) => {
  const a = moment(date).utc().format('DD/MM/YYYY HH:mm');
  return a === 'Invalid date' ? '' : a;
};
export const at = (date) => {
  const a = moment(date).utc().format('HH:mm [ngày] DD/MM/YYYY ');
  return a === 'Invalid date' ? '' : a;
};
export const echoTime = (date) => {
  const a = moment(date).utc().format('HH:mm');
  return a === 'Invalid date' ? '' : a;
};
export const fromNowMoment = (date) => {
  const tmpDate = moment(date);
  const a = tmpDate.startOf('seconds').fromNow();
  return a === 'Invalid date' ? '' : a;
};

export const fromNow = (date) => {
  // moment.updateLocale('vi', viLocale);
  const startTime = new Date().getTime();
  const endTime = new Date(date).getTime();
  const duration = (endTime - startTime);
  // const tmpDate = moment(date).add(1, 'hours');
  if (duration > 0) {
    const d = moment.duration(duration);
    return `còn ${Math.floor(d.asHours()) + moment.utc(duration).format(' [giờ] mm [phút]')}`;
  }
  return 'đã trễ';
  // return a === 'Invalid date' ? '' : a;
};
export const calPercentBetween = (from, to, now = null) => {
  const start = new Date(from);
  const end = new Date(to);
  const today = now || new Date();
  return Math.round(((today - start) / (end - start)) * 100);
};
export const isOutOfDate = (now, replyTimeExpect) => moment(now).isAfter(replyTimeExpect);
// const isTimeWarning =
//   (date, duration) => moment.duration((new Date()).diff(new Date(date))).asMinutes();

export const isTimeWarning = (now, replyTimeExpect, duration) => {
  const startTime = moment(now);
  const endTime = moment(new Date(replyTimeExpect));
  return moment.duration(startTime.diff(endTime)).asMinutes() <= duration;
};

export const getDurationInMicroSecond = (from, to) => {
  const startTime = new Date(from);
  const endTime = new Date(to);
  return endTime.getTime() - startTime.getTime();
};

export const addDate = (current, duration, type) => moment(current).add(duration, type);
export const checkOutOfDate = (from, to, duration) => {
  const tmpDiff = getDurationInMicroSecond(from, to);
  const tmpDuration = Math.round(tmpDiff / 60000);
  if (tmpDiff < 0) {
    return 1;
  } else if ((tmpDuration - duration) > 0) {
    return 3;
  }
  return 2;
};
