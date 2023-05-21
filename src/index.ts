#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const showAll = args.includes('-a');
const targetDir = args.find(arg => arg !== '-a') || process.cwd();

console.log(`Current directory: ${targetDir}`);

fs.readdir(targetDir, (err, files) => {
  if (err) {
    throw new Error(err.message);
  }

  if (!showAll) {
    files = files.filter(file => !file.startsWith('.'));
  }

  const data = files.map(file => {
    const filePath = path.join(targetDir, file);
    const stats = fs.statSync(filePath);
    const type = stats.isDirectory() ? 'directory' : 'file';
    const mode = stats.mode.toString(8);
    const permission = `-${mode[mode.length - 3] === '4' ? 'r' : '-'}${mode[mode.length - 3] === '2' ? 'w' : '-'}${mode[mode.length - 3] === '1' ? 'x' : '-'}${mode[mode.length - 2] === '4' ? 'r' : '-'}${mode[mode.length - 2] === '2' ? 'w' : '-'}${mode[mode.length - 2] === '1' ? 'x' : '-'}${mode[mode.length - 1] === '4' ? 'r' : '-'}${mode[mode.length - 1] === '2' ? 'w' : '-'}${mode[mode.length - 1] === '1' ? 'x' : '-'}`;
    const updatedAt = new Date(stats.mtime).toLocaleString();
    return [file, type, permission, updatedAt];
  });

  data.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0].localeCompare(b[0]);
    } else if (a[1] === 'directory') {
      return -1;
    } else {
      return 1;
    }
  });

  const columnWidths = [4, 4, 10, 9];
  data.forEach(row => {
    row.forEach((cell, i) => {
      columnWidths[i] = Math.max(columnWidths[i], cell.length);
    });
  });

  const drawLine = (startSymbol: string, middleSymbol: string, endSymbol: string) => {
    console.log(`${startSymbol}${'─'.repeat(columnWidths[0] + 2)}${middleSymbol}${'─'.repeat(columnWidths[1] + 2)}${middleSymbol}${'─'.repeat(columnWidths[2] + 2)}${middleSymbol}${'─'.repeat(columnWidths[3] + 2)}${endSymbol}`);
  };

  drawLine('┌', '┬', '┐');
  
  data.forEach(row => {
    console.log(`│ ${row[0].padEnd(columnWidths[0])} │ ${row[1].padEnd(columnWidths[1])} │ ${row[2].padEnd(columnWidths[2])} │ ${row[3].padEnd(columnWidths[3])} │`);
  });
  
  drawLine('└', '┴', '┘');
});
