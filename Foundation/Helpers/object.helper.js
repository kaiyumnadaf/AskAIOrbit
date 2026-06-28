import {lowerCase,upperCase,sentenceCase,titleCase,camelCase,pascalCase,snakeCase,kebabCase } from "./string.helper";

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