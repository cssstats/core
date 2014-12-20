
var fs = require('fs');
var cssstats = require('..');

var css = fs.readFileSync('./test/basscss.css', 'utf8');
var obj = cssstats(css);

//console.log(obj);
fs.writeFileSync('./test/basscss.json', JSON.stringify(obj, null, 2));

console.log('Test finished');

