import fs from 'fs';

export const getFiles = (targetDir: string, showAll: boolean): string[] => {
  let files = fs.readdirSync(targetDir);
  if (!showAll) {
    files = files.filter(file => !file.startsWith('.'));
  }
  return files;
};
