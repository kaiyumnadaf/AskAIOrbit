import  path from "path";
import fs from "fs/promises";

export const createFile = async (folder, filename, data = "") => (
  await fs.promises.mkdir(folder, { recursive: true }),
  fs.promises.writeFile(path.join(folder, filename), data)
);

export const createFolder = async (path, mode = 0o777) => (
  await fs.promises.mkdir(path, { recursive: true, mode }),
  await fs.promises.chmod(path, mode).catch(() => {}),
  path
);

export const fileExists = path => fs.existsSync(path);
export const folderExists = path => fs.existsSync(path);
export const readFile = path =>fs.readFileSync(path, "utf8");
export const readFileAsync = path =>fs.promises.readFile(path, "utf8");
export const deleteFile = path => fs.unlinkSync(path);
export const deleteFolder = path => fs.rmSync(path, { recursive: true, force: true });
export const appendFile = (path, data) => fs.appendFileSync(path, data);
export const copyFile = (src, dest) => fs.copyFileSync(src, dest);
export const moveFile = (src, dest) => fs.renameSync(src, dest);
export const getFiles = path => fs.readdirSync(path);
export const getStats = path => fs.statSync(path);
