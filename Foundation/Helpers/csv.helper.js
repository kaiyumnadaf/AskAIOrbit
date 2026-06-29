import fs from "fs";
import csv from "csv-parser";

export const readCSV = file =>
  new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(file)
      .pipe(csv())
      .on("data", r => rows.push(r))
      .on("end", () => resolve(rows))
      .on("error", reject);
  });


export const writeCSV = (file, data) => fs.writeFileSync(file, data.map(r => Object.values(r).join(",")).join("\n"));
export const jsonToCSV = data => !data.length ? "" : [Object.keys(data[0]).join(","), ...data.map(r => Object.values(r).join(","))].join("\n");
export const csvToJSON = readCSV;
export const csvExists = file => fs.existsSync(file);

export const csvDelete = file => fs.existsSync(file) && fs.unlinkSync(file);

export const csvAppend = (file, data) => fs.appendFileSync(file, data, "utf8");

export const csvSize = file => fs.existsSync(file) ? fs.statSync(file).size : 0;

export const csvPermission = file => fs.existsSync(file) && fs.chmodSync(file, 0o777);

export const csvHeaders = rows => rows.length ? Object.keys(rows[0]) : [];

export const csvRowCount = rows => rows.length;

export const csvColumnCount = rows => rows.length ? Object.keys(rows[0]).length : 0;

export const validateCSVColumns = (rows, cols) => rows.length && cols.every(c => c in rows[0]);

export const filterCSVColumns = (rows, cols) => rows.map(r => Object.fromEntries(cols.map(c => [c, r[c]])));

export const renameCSVColumns = (rows, map) => rows.map(r => Object.fromEntries(Object.entries(r).map(([k, v]) => [map[k] || k, v])));
