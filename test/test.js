var fs = require('fs');
var assert = require('assert');
var cssstats = require('..');

describe('css-statistics', function() {
  var stats;

  before(function() {
    stats = cssstats(fixture('small'));
  });

  describe('base stats', function() {

    it('should calculate the correct file size', function() {
      assert.equal(stats.size, 552);
    });

    it('should calculate the correct gzipped file size', function() {
      assert.equal(stats.gzipSize, 216);
    });
  });

  describe('averages', function() {

    it('should correctly count specificity stats', function() {
      assert.equal(stats.averages.specificity, 5.5);
    });

    it('should correctly count rule size stats', function() {
      assert.equal(stats.averages.ruleSize, 2.75);
    });
  });

  describe('aggregates', function() {

    it('should correclty count declarations', function() {
      assert.equal(stats.aggregates.declarations, 11);
    });

    it('should correclty count selectors', function() {
      assert.equal(stats.aggregates.selectors, 4);
    });
  });

  describe('declarations', function() {

    it('should correclty count vendor prefixes', function() {
      assert.equal(stats.declarations.vendorPrefixCount, 4);
    });

    it('should correclty count important values', function() {
      assert.equal(stats.declarations.importantCount, 2);
    });
  });

  it('should be able to parse css and produce stats', function() {
    ['basscss', 'small', 'font-awesome', 'gridio', 'gridio-national-light'].forEach(function(stylesheet) {
      // renderJson(stylesheet);
    });
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
