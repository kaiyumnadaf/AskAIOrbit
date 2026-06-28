import { IsNullOrEmpty } from "./validation.helper";

export const ReturnValidString = (x) => !IsNullOrEmpty(x) ? String(x) : '';

export const trimRAndLSpaces = str => (typeof str === 'string' ? str.trim() : str);

export const stripHtmlTags = input => typeof input === 'string' ? input.replace(/<[^>]+>/g, '') : input;


export const stringToBoolean = s => typeof s !== "string" ? s : ({true:1,yes:1,1:1,false:0,no:0,0:0}[s.trim().toLowerCase()] ?? !!s);

export const findAllOccurence = (str, search) => { const r = new RegExp(search, "gi"), a = []; for (let m; (m = r.exec(str));) a.push(m.index); return a; };



export const keypattern = (arr, pattern = '@', wrap = true) => {
  return arr.map(key =>
    wrap ? `${pattern}${key}${pattern}` : `${pattern}${key}`
  );
};

export const str_replaceReg = (str, searchArr, replacement, isKeyPair = false) => {
  const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  let result = str;

  for (let i = 0; i < searchArr.length; i++) {
    const key = searchArr[i];
    const value = isKeyPair ? replacement[key] : replacement[i];

    result = result.replace(new RegExp(escapeRegExp(key), 'gi'), value);
  }

  return result;
};



/**
 * Replace placeholders in a string using either an array or an object via str_replaceReg.
 * - If replacements is an object, set isKeyPair=true to map keys to values.
 * - If replacements is an array, provide searchArr and replacementArr in order.
 * @param {string} original - Source string
 * @param {Array|string|Object} searchOrReplacements - Array of search terms or an object of key->value
 * @param {Array} [replacementArr] - Array of replacement values (used when searchOrReplacements is Array)
 * @param {boolean} [isKeyPair=false] - Treat replacements as key-value pairs (object mode)
 * @param {string} [pattern='@'] - Placeholder wrapper, e.g., '@key@'
 * @param {boolean} [isBeforeAfter=true] - Wrap search tokens with pattern before and after
 * @returns {string}
 */
export const replaceDollarPlaceholders = (input, search, startIndex = 0) => {
  if (typeof input !== 'string') return input;

  const tokens = Array.isArray(search) ? search : [search];

  const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(tokens.map(escape).join('|'), 'g');

  if (startIndex === -1) {
    const matches = [];
    let m;

    while ((m = regex.exec(input)) !== null) {
      matches.push({ index: m.index, match: m[0] });
    }

    return matches;
  }

  let counter = startIndex;

  return input.replace(regex, () => {
    counter += 1;
    return `$${counter}`;
  });
};


export const strRepArrORJsonObj = (
  originalStr,
  obj,
  isKeyPair = false,
  pattern = '@',
  wrap = true
) => {
  const keys = _.keys(obj);

  const searchArr = keypattern(keys, pattern, wrap);

  return str_replaceReg(
    originalStr,
    searchArr,
    obj,
    isKeyPair
  );
};

const words = s => String(s ?? '').trim().match(/[A-Za-z0-9]+/g) || [];

export const upperCase    = s => String(s ?? '').toUpperCase();

export const lowerCase    = s => String(s ?? '').toLowerCase();

export const sentenceCase = s => (s = String(s ?? '').trim(), s ? s[0].toUpperCase() + s.slice(1).toLowerCase() : '');

export const titleCase    = s => words(s).map(w => w[0].toUpperCase() + w.slice(1).toLowerCase()).join(' ');

export const camelCase    = s => words(s).map((w, i) => i ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w.toLowerCase()).join('');

export const pascalCase   = s => words(s).map(w => w[0].toUpperCase() + w.slice(1).toLowerCase()).join('');

export const snakeCase    = s => words(s).map(w => w.toLowerCase()).join('_');

export const kebabCase    = s => words(s).map(w => w.toLowerCase()).join('-');