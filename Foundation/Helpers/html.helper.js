const entities = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '©': '&copy;',
  '®': '&reg;',
  '™': '&trade;',
  '€': '&euro;',
  '£': '&pound;',
  '¥': '&yen;',
  '¢': '&cent;'
};


export const htmlEncode = s => String(s ?? '').replace(/[&<>"'©®™€£¥¢]/g, c => entities[c]);

export const createCells = (obj, tag = "td") =>
  Object.values(obj).map(v => `<${tag}>${v ?? ""}</${tag}>`).join("");

export const createHeaders = obj =>
  Object.keys(obj).map(k => `<th>${k}</th>`).join("");

export const createHTML = (data, attrs = {}, before = "") =>
  !Array.isArray(data) || !data.length
    ? ""
    : `${before}<table ${Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(" ")}>
        <thead><tr>${createHeaders(data[0])}</tr></thead>
        <tbody>${data.map(r => `<tr>${createCells(r)}</tr>`).join("")}</tbody>
      </table>`;



export const processTemplateHtml = (html, { forJsonStorage = true, escapeHtml = false } = {}) =>
  String(html ?? "")
    .replace(forJsonStorage ? /[\r\n\t\f]/g : /$^/, c => ({ "\r": "\\r", "\n": "\\n", "\t": "\\t", "\f": "\\f" }[c]))
    .replace(forJsonStorage ? /(?<!\\)["']/g : /$^/, c => `\\${c}`)
    .replace(escapeHtml ? /[&<>"']/g : /$^/, c => entities[c]);