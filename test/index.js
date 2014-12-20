
var fs = require('fs');
var cssstats = require('..');
var getcss = require('get-css');

function renderJson(filename) {
  var css = fs.readFileSync('./test/' + filename + '.css', 'utf8');
  var obj = cssstats(css);
  fs.writeFileSync('./test/' + filename + '.json', JSON.stringify(obj, null, 2));
}

renderJson('basscss');
renderJson('small');

// Seems to be an issue with postcss module
//renderJson('stackoverflow');

renderJson('font-awesome');
renderJson('gridio');
renderJson('gridio-national-light');


// Receives a type error - probably from postcss module
//getcss('http://thegrid.io', { gzip: true })
//  .then(function(response) {
//    var obj = cssstats(response.styles);
//    fs.writeFileSync('./test/gridio.json', JSON.stringify(obj, null, 2));
//  })
//  .catch(function(error) {
//    console.error(error);
//  });


console.log('Test finished');


