import fs from 'fs';
import path from 'path';

export const getData = (files: string[], targetDir: string): any[] => {
  return files.map(file => {
    const filePath = path.join(targetDir, file);
    const stats = fs.statSync(filePath);
    const type = stats.isDirectory() ? 'directory' : 'file';
    const mode = stats.mode.toString(8);
    const permission = `-${mode[mode.length - 3] === '4' ? 'r' : '-'}${mode[mode.length - 3] === '2' ? 'w' : '-'}${mode[mode.length - 3] === '1' ? 'x' : '-'}${mode[mode.length - 2] === '4' ? 'r' : '-'}${mode[mode.length - 2] === '2' ? 'w' : '-'}${mode[mode.length - 2] === '1' ? 'x' : '-'}${mode[mode.length - 1] === '4' ? 'r' : '-'}${mode[mode.length - 1] === '2' ? 'w' : '-'}${mode[mode.length - 1] === '1' ? 'x' : '-'}`;
    const updatedAt = new Date(stats.mtime).toLocaleString();
    return [file, type, permission, updatedAt];
  });
};
