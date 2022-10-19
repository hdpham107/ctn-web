const monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const getTimeAgo = (date) =>  {
    date = new Date(date);
    date.setTime( date.getTime());
    let time = date.getTime();

    if (time <= 0)
        return '1s';
    let subDate = Math.floor((Date.now() - time) / 1000);

    if (subDate < 0)
        return "1s";
    let y = subDate / (86400 * 365);
    y = Math.floor(y);
    if (y > 0) {
       return y + "y";
    }
    let m = (subDate) / (86400 * 30);
    m = Math.floor(m);
    if (m > 0) {
        return m + "month";
    }
    let d = (subDate) / (86400);
    d = Math.floor(d);
    if (d > 0) {
        return d + "d";
    }
    let h = subDate / 3600;
    h = Math.floor(h);
    let i = (subDate - h * 3600) / 60;
    i = Math.floor(i);
    if (h > 0) {
        return h + "h";
    } else if (i > 0) {
            return i + "m";
    } else {
        return "1s";
    }
}

export const getTimeAgoFullString = (date) =>  {
    if (!date) {
        return ''
    } 
    date = new Date(date);
    date.setTime( date.getTime());
    let time = date.getTime();

    if (time <= 0)
        return 'vừa mới';
    let subDate = Math.floor((Date.now() - time) / 1000);

    if (subDate < 0)
        return "vừa mới";
    let y = subDate / (86400 * 365);
    y = Math.floor(y);
    if (y > 0) {
       return y + " year ago";
    }
    let m = (subDate) / (86400 * 30);
    m = Math.floor(m);
    if (m > 0) {
        return m + " month ago";
    }
    let d = (subDate) / (86400);
    d = Math.floor(d);
    if (d > 0) {
        return d + " day ago";
    }
    let h = subDate / 3600;
    h = Math.floor(h);
    let i = (subDate - h * 3600) / 60;
    i = Math.floor(i);
    if (h > 0) {
        return h + " hours ago";
    } else if (i > 0) {
            return i + " mins ago";
    } else {
        return "vừa mới";
    }
}

export const formatDateAndTime = (date) =>  {
    if (!date) return {
        date: '',
        day: '',
        time: ''
    }
    let d = new Date(date);
    let curr_date = d.getDate();
    let curr_month = d.getMonth();
    let curr_year = d.getFullYear();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let monthName = monthShortNames[curr_month]

    curr_date = (curr_date < 10) ? '0' + curr_date : curr_date;
    let day = `${monthName} ${curr_date}, ${curr_year}`
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let time = hours + ':' + minutes + ' ' + ampm;

    return {
        date: `${day} ${time}`,
        day,
        time
    }
}
