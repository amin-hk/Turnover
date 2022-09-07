const getEn = (number) => {
  if (!number) {
    return "";
  }
  var res = number
    .replace(/[\u0660-\u0669]/g, function (c) {
      return c.charCodeAt(0) - 0x0660;
    })
    .replace(/[\u06f0-\u06f9]/g, function (c) {
      return c.charCodeAt(0) - 0x06f0;
    });
  return res;
};

const formatNumber = (value) => {
  value = new String(value).replace(/,/g, "");
  return new String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const getFixedNumber = (num, fixed = 2) => {
  if (String(num).includes(",")) {
    num = num.replace(/,/g, "");
    num = parseFloat(num);
  }
  if (fixed === 0) {
    return num.toFixed(0);
  }
  if (Math.floor(num) === num) return num;
  return num.toFixed(fixed);
};

function getTimeDiff(
  dateFuture,
  dateNow,
  isStrMode = false,
  isNumberMode = false
) {
  // console.log(dateNow)
  let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

  const days = Math.floor(diffInMilliSeconds / 86400);
  diffInMilliSeconds -= days * 86400;

  const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
  diffInMilliSeconds -= hours * 3600;

  const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
  diffInMilliSeconds -= minutes * 60;

  const seconds = Math.floor(diffInMilliSeconds);
  diffInMilliSeconds -= seconds * 60;

  let difference = "";
  if (days > 0) {
    difference += `${days} - `;
  }

  if (isNumberMode) {
    return days * 86400 + hours * 3600 + minutes * 60 + seconds;
  }

  if (isStrMode) {
    difference += `${hours > 0 ? hours + " ساعت " : ""}${
      minutes > 0 ? minutes + " دقیقه " : ""
    }${seconds + " ثانیه "}`;
    return difference;
  }

  difference += `${hours > 0 ? hours + ":" : ""}${
    minutes > 0 ? minutes + ":" : ""
  }${seconds}`;

  return difference.includes("N") ? "00:00" : difference;
}

const numberToLetter = (num, level) => {
  "use strict";

  function isCorrectNumber(num) {
    return /^-?(\d{1,3},?)+(\.?\d+)?$/.test(num);
  }

  if (num === null) {
    return "";
  }

  level = level || 0;

  if (level === 0 && typeof num === "string" && isCorrectNumber(num)) {
    num = parseInt(num.replace(/,/g, ""));
  }

  if (num < 0) {
    num = num * -1;
    return "منفی " + numberToLetter(num, level);
  }
  if (num === 0) {
    if (level === 0) {
      return "صفر";
    } else {
      return "";
    }
  }
  var result = "",
    yekan = [
      " یک ",
      " دو ",
      " سه ",
      " چهار ",
      " پنج ",
      " شش ",
      " هفت ",
      " هشت ",
      " نه ",
    ],
    dahgan = [
      " بیست ",
      " سی ",
      " چهل ",
      " پنجاه ",
      " شصت ",
      " هفتاد ",
      " هشتاد ",
      " نود ",
    ],
    sadgan = [
      " یکصد ",
      " دویست ",
      " سیصد ",
      " چهارصد ",
      " پانصد ",
      " ششصد ",
      " هفتصد ",
      " هشتصد ",
      " نهصد ",
    ],
    dah = [
      " ده ",
      " یازده ",
      " دوازده ",
      " سیزده ",
      " چهارده ",
      " پانزده ",
      " شانزده ",
      " هفده ",
      " هیجده ",
      " نوزده ",
    ];
  if (level > 0) {
    result += " و ";
    level -= 1;
  }

  if (num < 10) {
    result += yekan[num - 1];
  } else if (num < 20) {
    result += dah[num - 10];
  } else if (num < 100) {
    result +=
      dahgan[parseInt(num / 10, 10) - 2] + numberToLetter(num % 10, level + 1);
  } else if (num < 1000) {
    result +=
      sadgan[parseInt(num / 100, 10) - 1] +
      numberToLetter(num % 100, level + 1);
  } else if (num < 1000000) {
    result +=
      numberToLetter(parseInt(num / 1000, 10), level) +
      " هزار " +
      numberToLetter(num % 1000, level + 1);
  } else if (num < 1000000000) {
    result +=
      numberToLetter(parseInt(num / 1000000, 10), level) +
      " میلیون " +
      numberToLetter(num % 1000000, level + 1);
  } else if (num < 1000000000000) {
    result +=
      numberToLetter(parseInt(num / 1000000000, 10), level) +
      " میلیارد " +
      numberToLetter(num % 1000000000, level + 1);
  } else if (num < 1000000000000000) {
    result +=
      numberToLetter(parseInt(num / 1000000000000, 10), level) +
      " تریلیارد " +
      numberToLetter(num % 1000000000000, level + 1);
  }
  return result;
};

const numberToLetterToman = (num) => {
  if (num >= 10) {
    num = parseInt(num / 10, 10);
  } else if (num <= -10) {
    num = parseInt(num / 10, 10);
  } else {
    num = 0;
  }

  return numberToLetter(num, 0) + " تومان";
};

const getRequestsTime = () => {
  const time = parseInt(process.env.REACT_APP_REQUEST_TIME);
  if (time == 0 || time < 30) {
    return 30;
  }
  return time;
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const getDateFormat = (date) => {
  if (date == null) {
    return null;
  }
  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
};

export {
  getEn,
  formatNumber,
  getFixedNumber,
  getTimeDiff,
  getDateFormat,
  numberToLetterToman,
  getRequestsTime,
};
