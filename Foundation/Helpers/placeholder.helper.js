export const mapPlaceholdersToIndexes = s => String(s || '').replace(/\{([^{}]+)\}/g, ((m, i) => (a, b) => ((b = b.trim()), !b ? a : /^\d+$/.test(b) ? `{${b}}` : `{${m.has(b) ? m.get(b) : (m.set(b, i++), m.get(b))}}`))(new Map(), 0));

export const mapIndexesToValues = (s, paramArr) => String(s || '').replace(/\{(\d+)\}/g, (m, i) => paramArr[Number(i)] || '');