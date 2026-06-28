
export const isUndefined = (x) =>typeof x === undefined;

export const isEmpty = value => value == null ? true : ((typeof value === 'string' || Array.isArray(value)) ? value.length === 0 : Object.keys(value).length === 0);

export const IsNullOrEmpty = x => (isUndefined(x) || x === null || x === false || x === "" || (typeof x === 'number' ? isNaN(x) : isEmpty(x)) || x.length === 0 || (x?.length === 'number' && x.length === 0) || (typeof x === 'string' && x.trim().length === 0));

export const IsNullOrEmptyNZero = x => (isUndefined(x) || x === null || x === false || x === "" || (typeof x === 'number' ? x == 0 ? true : isEmpty(x) : x === '') || (x?.length === 'number' && x.length === 0 || (typeof x === 'string' && x.trim().length === 0)));

export const IsEmpty = x => (isUndefined(x) || x === false || x === "" || x.length === 0);

