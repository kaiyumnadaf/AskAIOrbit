
export const formatDateToMySQL = (date) => {
  const pad = (n) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
    `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};


/**
 * Format JS Date or string as YYYYMMDD
 * @param {Date|string} d
 * @returns {string}
 */

export const newDate = (s, f) => {
  if (typeof s !== 'string') throw new Error('Input must be a string');
  const m = s.match(/\d+/g);
  const t = f.match(/YYYY|MM|DD|HH|mm|ss/g);
  const o = Object.fromEntries(t.map((k, i) => [k, +m[i]]));
  return new Date(o.YYYY || 0, (o.MM || 1) - 1, o.DD || 1, o.HH || 0, o.mm || 0, o.ss || 0);
};

export const ArrayBetDatesPlusOne = (startDate, endDate, formatStr = "YYYY-MM-DD") => {
  const result = [];
  for (let d = new Date(startDate); d <= new Date(endDate); d.setDate(d.getDate() + 1))
    result.push(format(new Date(d), formatStr));
  return result;
};

export const isDateArrobjDatabykey = (objArr, key) =>objArr.filter(x => Number.isNaN(new Date(x[key]).getTime()));


export const getDateparse = (result, key, formatStr) => {
  for (const x of result)
    if (!IsNullOrEmpty(x[key]))
      x[key] = format(x[key], formatStr);
};

export const getDateparsewithformat = (result, key, formatStr) => {
  for (const x of result) {
    if (!IsNullOrEmpty(x[key])) {
      const d = new Date(x[key]);
      if (!Number.isNaN(d.getTime()))
        x[key] = format(d, formatStr);
      else {
        blog.error(`Invalid date: ${x[key]}`);
        x[key] = null;
      }
    }
  }
};



export const isValidDateOrTime = (value) => {
  if (!value) return false;

  // 🔹 TIME ONLY (10:00:00)
  const timeRegex = /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
  if (timeRegex.test(value)) return true;

  // 🔹 DATE ONLY or DATETIME
  const normalized = value.replace(' ', 'T');

  const date = new Date(normalized);
  return !isNaN(date.getTime());
};




/**
 * Parse a date string in any common format and return it in the desired format.
 * Supported input: '2025/01/10 00:00:00', '2025-01-10 00:00:00', '20250110 00:00:00', '10/01/2025 00:00:00', etc.
 * @param {string} dateString - The input date string.
 * @param {string} outputFormat - The desired output format, e.g. 'YYYY-MM-DD HH:mm:ss', 'YYYY/MM/DD HH:mm:ss', 'DD/MM/YYYY HH:mm:ss', 'DD-MM-YYYY HH:mm:ss'
 * @returns {string|null}
 */

export const parseDate = (value, format = "YYYY-MM-DD HH:mm:ss") => {
    if (!value || !format) return null;

    const tokens = format.match(/YYYY|MM|DD|HH|mm|ss/g);
    const numbers = String(value).match(/\d+/g);

    if (!tokens || !numbers || tokens.length !== numbers.length)
        return null;

    const obj = {};

    tokens.forEach((t, i) => obj[t] = Number(numbers[i]));

    const d = new Date(
        obj.YYYY ?? 0,
        (obj.MM ?? 1) - 1,
        obj.DD ?? 1,
        obj.HH ?? 0,
        obj.mm ?? 0,
        obj.ss ?? 0
    );

    return d.getFullYear() === (obj.YYYY ?? d.getFullYear()) &&
           d.getMonth() === (obj.MM ?? 1) - 1 &&
           d.getDate() === (obj.DD ?? 1) &&
           d.getHours() === (obj.HH ?? 0) &&
           d.getMinutes() === (obj.mm ?? 0) &&
           d.getSeconds() === (obj.ss ?? 0)
        ? d
        : null;
};

export const convertDateFormat = (value, fromFormat, toFormat = "YYYY-MM-DD HH:mm:ss") => {
    const d = parseDate(value, fromFormat);
    return d ? formatDate(d, toFormat) : null;
};


export const formatDate = (value, format = "YYYY-MM-DD HH:mm:ss", inputFormat) => {
    const d = inputFormat ? parseDate(value, inputFormat) : new Date(value);

    if (!d || Number.isNaN(d.getTime()))
        return null;

    const pad = n => String(n).padStart(2, "0");

    return format.replace(/YYYY|MM|DD|HH|mm|ss/g, t => ({
        YYYY: d.getFullYear(),
        MM: pad(d.getMonth() + 1),
        DD: pad(d.getDate()),
        HH: pad(d.getHours()),
        mm: pad(d.getMinutes()),
        ss: pad(d.getSeconds())
    })[t]);
};

export const isValidDate = d => !Number.isNaN(new Date(d).getTime());

export const addDays = (d, n) => (d = new Date(d), d.setDate(d.getDate() + n), d);

export const addMonths = (d, n) => (d = new Date(d), d.setMonth(d.getMonth() + n), d);

export const addYears = (d, n) => (d = new Date(d), d.setFullYear(d.getFullYear() + n), d);

export const addHours = (d, n) => (d = new Date(d), d.setHours(d.getHours() + n), d);

export const addMinutes = (d, n) => (d = new Date(d), d.setMinutes(d.getMinutes() + n), d);

export const addSeconds = (d, n) => (d = new Date(d), d.setSeconds(d.getSeconds() + n), d);

export const isBefore = (a, b) => new Date(a) < new Date(b);

export const isAfter = (a, b) => new Date(a) > new Date(b);

export const isSameDay = (a, b) => format(a, "YYYYMMDD") === format(b, "YYYYMMDD");