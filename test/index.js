
var fs = require('fs');
var cssstats = require('..');

function renderJson(filename) {
  var css = fs.readFileSync('./test/' + filename, 'utf8');
  var obj = cssstats(css);
  fs.writeFileSync('./test/' + filename + '.json', JSON.stringify(obj, null, 2));
}

renderJson('basscss.css');
renderJson('small.css');

//console.log(obj);

console.log('Test finished');

