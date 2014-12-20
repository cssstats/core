#!/usr/bin/env node

var program = require('commander');
var cssstats = require('..');
var fs = require('fs');

var version = '0.0.1'

console.log('CSS Statistics CLI (' + version + ')');

program
  .version(version);

program
  .command('file [file]')
  .description('read a local css file')
  .action(function(file) {
    if (!file) {
      console.log('Please specify a CSS file');
      return;
    }

    try {
      var css = fs.readFileSync(file, 'utf8');
      console.log(JSON.stringify(cssstats(css), null, 2));
    } catch (e) {
      console.log('CSS Statistics encountered an error reading ' + file);
      console.log(e);
    }
  });

program.parse(process.argv);
