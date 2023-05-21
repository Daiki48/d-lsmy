#!/usr/bin/env node

import { drawLine } from './components/drawLine';
import { getTargetDir } from './components/getTargetDir';
import { getFiles } from './components/getFiles';
import { getData } from './components/getData';
import { sortData } from './components/sortData';
import { getColumnWidths } from './components/getColumnWidths';

const args = process.argv.slice(2);
const showAll = args.includes('-a');
const targetDir = getTargetDir(args);

console.log(`Current directory: ${targetDir}`);

const files = getFiles(targetDir, showAll);
const data = getData(files, targetDir);

sortData(data);

const columnWidths = getColumnWidths(data);

drawLine(columnWidths, '┌', '┬', '┐');

data.forEach(row => {
  console.log(`│ ${row[0].padEnd(columnWidths[0])} │ ${row[1].padEnd(columnWidths[1])} │ ${row[2].padEnd(columnWidths[2])} │ ${row[3].padEnd(columnWidths[3])} │`);
});

drawLine(columnWidths, '└', '┴', '┘');
