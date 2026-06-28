import {lowerCase,upperCase,sentenceCase,titleCase,camelCase,pascalCase,snakeCase,kebabCase } 
from "./string.helper.js";
import {IsNullOrEmpty} from './validation.helper.js';

export const normalizeKey = (key, type = "lower", separator = "") => ({
  lower: lowerCase,
  upper: upperCase,
  sentence: sentenceCase,
  title: titleCase,
  camel: camelCase,
  pascal: pascalCase,
  snake: snakeCase,
  kebab: kebabCase
}[type]?.(key)?.replace(/[\s_-]+/g, separator) ?? key);

export const normalizeObjectKeys = (obj, type = "lower", separator = "") =>
    Object.fromEntries(Object.entries(obj).map(([k, v]) => [normalizeKey(k, type, separator), v]));

export const omitEmptyProperties = obj =>Object.fromEntries(Object.entries(obj).filter(([, value]) => !IsNullOrEmpty(value)));


export const removeObjectKey = (arr, key) => arr.map(obj => (delete obj[key], obj));
export const removeObjectKeys = (arr, keys) => arr.map(obj => (keys.forEach(k => delete obj[k]), obj));


export const createObjects = (values, key, valueKey, defaultValue = null) =>
  values.map(value => ({
    [key]: value,
    [valueKey]:
      typeof defaultValue === "function"
        ? defaultValue(value)
        : defaultValue
  }));

export const mapToObjects = (values, mapper) => values.map(mapper);

export const mergeExistingProperties = (target, source) => Object.fromEntries(Object.entries(target).map(([k, v]) => [k, k in source ? source[k] : v]));

export const mergeObjects = (target, source) => ({ ...target, ...source });

export const reorderObjectArrayKeys = (arr, order) =>arr.map(o => reorderKeys(o, order));

export const reorderKeys = (obj, order = []) => {
    if (!obj || typeof obj !== "object") return {};
    const set = new Set(order);
    return Object.fromEntries([
      ...order.filter(k => k in obj).map(k => [k, obj[k]]),
      ...Object.entries(obj).filter(([k]) => !set.has(k))
    ]);
};

export const mergeObjectArrays = (target, source, targetKey, sourceKey = targetKey) => (
  source = new Map(source.map(o => [o[sourceKey], o])),
  target.map(o => ({ ...o, ...source.get(o[targetKey]) }))
);

export const mapByKey = (source, lookup, matchKey, returnKey, asObject = false) => (
  lookup = new Map(lookup.map(o => [o[matchKey], o[returnKey]])),
  source.flatMap(item => {
    const value = lookup.get(item?.[matchKey] ?? item);
    return value === undefined ? [] : [asObject ? { [returnKey]: value } : value];
  })
);

export const objectsToArray = (objects, columns, defaultValue = null) =>
  objects.map(obj => columns.map(col => obj[col] ?? defaultValue));

export const addPrefixSuffix = (arr, prefix = "", suffix = "") =>
  arr.map(v => `${prefix}${v}${suffix}`);
export const move=(arr,f,t)=>(arr=[...arr],arr.splice(t,0,arr.splice(f,1)[0]),arr);
export const deepClone = obj => structuredClone(obj);
export const merge = (...objs) => Object.assign({}, ...objs);
export const pick = (obj, keys) => Object.fromEntries(keys.filter(k => k in obj).map(k => [k, obj[k]]));
export const omit = (obj, keys) => (
  keys = new Set(keys),
  Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.has(k)))
);
export const hasKey = (obj, key) => Object.hasOwn(obj, key);
export const hasValue = (obj, value) => Object.values(obj).includes(value);
export const renameKey = (obj, from, to) => ({ ...omit(obj, [from]), [to]: obj[from] });
export const invert = obj => Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]));
export const mapKeys = (obj, fn) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [fn(k, v), v]));
export const mapValues = (obj, fn) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fn(v, k)]));
export const filterKeys = (obj, fn) => Object.fromEntries(Object.entries(obj).filter(([k]) => fn(k)));
export const filterValues = (obj, fn) => Object.fromEntries(Object.entries(obj).filter(([, v]) => fn(v)));
export const findKey = (obj, fn) => Object.keys(obj).find(k => fn(obj[k], k));
export const findValue = (obj, fn) => Object.values(obj).find(fn);
export const defaults = (obj, def) => ({ ...def, ...obj });
export const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
export const isPlainObject = obj => obj?.constructor === Object;
export const isEmptyObject = obj => !Object.keys(obj).length;
export const entries = obj => Object.entries(obj);
export const keys = obj => Object.keys(obj);
export const values = obj => Object.values(obj);
export const fromEntries = arr => Object.fromEntries(arr);
export const size = obj => Object.keys(obj).length;
export const assignIfMissing = (obj, src) => Object.entries(src).forEach(([k, v]) => k in obj || (obj[k] = v)) || obj;
export const filterKeysByValue = (obj, fn = IsNullOrEmpty) => Object.fromEntries(Object.entries(obj).filter(([, v]) => !fn(v)));
export const removeEmptyKeys = obj => filterKeysByValue(obj);
export const removeKeys = (obj, keys) => Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));
export const freeze = obj => Object.freeze(obj);
export const seal = obj => Object.seal(obj);
export const get = (obj, path, def) => path.split('.').reduce((o, k) => o?.[k], obj) ?? def;
export const set = (obj, path, value) => (path.split('.').reduce((o, k, i, a) => o[k] ??= i === a.length - 1 ? value : {}, obj), obj);
export const unset = (obj, path) => (path = path.split('.'), delete path.slice(0, -1).reduce((o, k) => o?.[k], obj)?.[path.at(-1)], obj);
export const deepMerge = (a, b) => Object.entries(b).reduce((o, [k, v]) => (o[k] = isPlainObject(v) && isPlainObject(o[k]) ? deepMerge(o[k], v) : v, o), { ...a });
