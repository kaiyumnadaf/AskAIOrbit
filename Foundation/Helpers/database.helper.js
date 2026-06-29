import { readCSV } from "./csv.helper.js";

export const importCSV = async ({ filePath, tableName, dbconnection }) => {
  const rows = await readCSV(filePath);
  return rows.length
    ? persist({
        data: rows,
        schemas: [[{}, { Tables: [tableName] }]],
        dbconnection,
        isreturninsertid: 0
      })
    : [];
};

export const csvHeaders = rows => rows.length ? Object.keys(rows[0]) : [];

export const csvRowCount = rows => rows.length;

export const csvColumnCount = rows => rows.length ? Object.keys(rows[0]).length : 0;

export const validateCSVColumns = (rows, cols) =>
  rows.length && cols.every(c => c in rows[0]);

export const filterCSVColumns = (rows, cols) =>
  rows.map(r => Object.fromEntries(cols.map(c => [c, r[c]])));

export const renameCSVColumns = (rows, map) =>
  rows.map(r => Object.fromEntries(Object.entries(r).map(([k, v]) => [map[k] || k, v])));