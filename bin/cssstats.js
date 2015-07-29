#!/usr/bin/env node

var program = require('commander')
var cssstats = require('..')
var fs = require('fs')
var stdin = require('stdin')

var version = '1.6.0'

console.log('CSS Statistics CLI (' + version + ')')

program
  .version(version)

program
  .command('file [file]')
  .description('read a local css file')
  .action(function (file) {
    if (!file) {
      console.log('Please specify a CSS file')
      return
    }

    try {
      var css = fs.readFileSync(file, 'utf8')
      console.log(JSON.stringify(cssstats(css), null, 2))
    } catch (e) {
      console.log('CSS Statistics encountered an error reading ' + file)
      console.log(e)
    }
  })

program.parse(process.argv)

if (!program.args.length) {
  console.log('Input some CSS\n^C to cancel\n^D when complete')

  stdin(function (css) {
    if (css) {
      console.log(JSON.stringify(cssstats(css), null, 2))
    }
  })
}
