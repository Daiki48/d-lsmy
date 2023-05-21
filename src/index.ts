#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, (err, files) => {
  if (err) {
    throw new Error(err.message);
  }

  console.log(files.join('\n'));
});
