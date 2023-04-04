import moment from 'moment-timezone';
import { DATE_FORMAT } from './Constants';
import { NormalFormat } from './NumberFormat';
import Cookies from "universal-cookie";

const getCurrentDate = (format = DATE_FORMAT[1]) => {
  return moment(new Date()).tz('America/Los_Angeles').format(format);
};

const setToken = (token) => {
  const cookies = new Cookies();
  cookies.set("accessToken", token, { maxAge: 60000 });
  // cookies.endTime(new Date(Date.now() + 1000 * 60 * 60 * 24 * 7));
};

const getToken = () => {
  const cookies = new Cookies();
  return cookies.get("accessToken");
};

const removeToken = () => {
  const cookies = new Cookies();
  return cookies.remove("accessToken");
};

const getOneDayBeforeDate = (format = DATE_FORMAT[1]) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return moment(yesterday).tz('America/Los_Angeles').format(format);
};

const getNDayBeforeDate = (dayBefore) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - dayBefore);
  return moment(yesterday).tz('America/Los_Angeles').format('YYYY/MM/DD');
};

function capitalizeFirstLetter(string) {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
}

const replaceEmpty = (value) => {
  if (value === '' || value === null || value === undefined) {
    return '-';
  } else {
    return value;
  }
};

const replaceEmptyWithPostFix = (value, postFix = '%') => {
  if (value === '' || value === null || value === undefined) {
    return '-';
  } else {
    return `${value} ${postFix ? postFix : ''}`;
  }
};

const replaceEmptyWithPreFix = (value, preFix = '$') => {
  if (value === '' || value === null || value === undefined) {
    return '-';
  } else {
    return `${preFix ? preFix : ''} ${value}`;
  }
};

const replaceEmptyWithNumberPreFix = (value, preFix = '$') => {
  if (value === '' || value === null || value === undefined) {
    return '-';
  } else {
    return `${preFix ? preFix : ''} ${NormalFormat(value)}`;
  }
};

const millionToBillionConvert = (number) => {
  return number ? `${(number / 1000).toFixed(2)} B` : '-';
};

const convertCamelCaseToSpaceSeparatedString = (text) => {
  if (text) {
    const result = text.replace(/([A-Z])/g, ' $1');
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
  } else {
    return '';
  }
};

function camelCase(str) {
  return str?.replaceAll('_'," ")
  }

function underScore(str) {
  return str?.replaceAll(' ',"_")
}

const convertCamelCaseToUnderscoreSeparatedString = (text) => {
  if (text) {
    const result = text.replace(/([A-Z])/g,'$1');
    const check = result.replaceAll(" ","_")
    return check;
  } else {
    return '';
  }
};

const capitalizeFirstLetterOfEachWord = (str) => {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(' ');
};

const debounce = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

// const setToken = (token) => {
//   localStorage.setItem('token', token);
// };

// const getToken = () => {
//   return localStorage.getItem('token');
// };

function generateId(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const getTextColorByValue = (val) => {
  let color = ''
  if (val) {
    if (val > 0) {
      color = 'up-color'
    } else if (val < 0) {
      color = 'down-color'
    }
  }
  return color
}

const isMarketOpen = () => {
  var currentTime = moment(new Date()).utc()
  var startTime = moment('1:30p', 'HH:mm a').utc()
  var endTime = moment('08:00p', 'HH:mm a').utc()

  const active = currentTime.isBetween(startTime, endTime)
  return active
}

export {
  getCurrentDate,
  getOneDayBeforeDate,
  capitalizeFirstLetter,
  replaceEmpty,
  millionToBillionConvert,
  replaceEmptyWithPostFix,
  replaceEmptyWithPreFix,
  replaceEmptyWithNumberPreFix,
  convertCamelCaseToSpaceSeparatedString,
  convertCamelCaseToUnderscoreSeparatedString,
  camelCase,
  underScore,
  getNDayBeforeDate,
  capitalizeFirstLetterOfEachWord,
  debounce,
  setToken,
  getToken,
  removeToken,  
  generateId,
  getTextColorByValue,
  isMarketOpen
}
