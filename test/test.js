var fs = require('fs');
var assert = require('assert');
var cssstats = require('..');

describe('css-statistics', function() {

  it('should be able to parse css and produce stats', function() {
    ['basscss', 'small', 'font-awesome', 'gridio', 'gridio-national-light'].forEach(function(stylesheet) {
      renderJson(stylesheet);
    });
  });

  describe('averages', function() {
    var stats;

    before(function() {
      stats = cssstats(fixture('small'));
    });

    it('should correctly count specificity stats', function() {
      assert.equal(stats.averages.specificity, 5.5);
    });

    it('should correctly count rule size stats', function() {
      assert.equal(stats.averages.ruleSize, 2.75);
    });

    it('should correclty count vendor prefixes', function() {
      assert.equal(stats.declarations.vendorPrefixCount, 4);
    })
  });
});

function fixture(name) {
  return fs.readFileSync('test/fixtures/' + name + '.css', 'utf8').toString().trim();
}

function renderJson(filename) {
  var css = fixture(filename);
  var obj = cssstats(css);
  fs.writeFileSync('./test/json-rendering/' + filename + '.json', JSON.stringify(obj, null, 2));
}
