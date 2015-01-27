var fs = require('fs');
var assert = require('assert');
var cssstats = require('..');

describe('css-statistics', function() {
  var stats;

  before(function() {
    stats = cssstats(fixture('small'));
    console.log(stats);
  });

  describe('base stats', function() {

    it('should calculate the correct file size', function() {
      assert.equal(stats.size, 573);
    });

    it('should calculate the correct gzipped file size', function() {
      assert.equal(stats.gzipSize, 232);
    });
  });

  describe('averages', function() {

    it('should correctly count specificity stats', function() {
      assert.equal(stats.averages.specificity, 5.5);
    });

    it('should correctly count rule size stats', function() {
      assert.equal(stats.averages.ruleSize, 3);
    });
  });

  describe('aggregates', function() {

    it('should correclty count declarations', function() {
      assert.equal(stats.aggregates.declarations, 12);
    });

    it('should correctly count selectors', function() {
      assert.equal(stats.aggregates.selectors, 4);
    });

    it('should correctly count media queries', function() {
      assert.equal(stats.aggregates.mediaQueries.length, 1);
    });

    it('should maintain the units from the media query', function() {
      assert.equal(stats.aggregates.mediaQueries[0], '(minWidth:30.123em)');
    });
  });

  describe('declarations', function() {

    it('should correctly count vendor prefixes', function() {
      assert.equal(stats.declarations.vendorPrefixCount, 4);
    });

    it('should correctly count important values', function() {
      assert.equal(stats.declarations.importantCount, 2);
    });

    it('should correctly maintains em units', function() {
      assert.equal(stats.declarations.unique.width[0].value, '55.625em');
    });
  });

  it('should be able to parse css and produce stats', function() {
    ['basscss', 'small', 'font-awesome', 'gridio', 'gridio-national-light'].forEach(function(stylesheet) {
      renderJson(stylesheet);
    });
  });
});

function fixture(name) {
  return fs.readFileSync('test/fixtures/' + name + '.css', 'utf8').toString().trim();
}

function renderJson(filename) {
  var css = fixture(filename);
  var obj = cssstats(css);
  fs.writeFileSync('./test/results/' + filename + '.json', JSON.stringify(obj, null, 2));
}
