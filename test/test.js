var fs = require('fs');
var assert = require('assert');
var postcss = require('postcss');
var cssstats = require('..');

describe('css-statistics', function() {
  var stats;

  before(function() {
    stats = cssstats(fixture('small'));
  });

  describe('AST arguments', function() {

    it('should be handled correctly', function() {
      var ast = postcss.parse(fixture('small'));
      var astStats = cssstats(ast);
      assert.deepEqual(astStats.aggregates, stats.aggregates);
    });
  });

  describe('base stats', function() {

    it('should calculate the correct file size', function() {
      assert.equal(stats.size, 827);
    });

    it('should calculate the correct gzipped file size', function() {
      assert.equal(stats.gzipSize, 336);
    });
  });

  describe('averages', function() {

    it('should correctly count specificity stats', function() {
      assert.equal(stats.averages.specificity, 20.272727272727273);
    });

    it('should correctly count rule size stats', function() {
      assert.equal(stats.averages.ruleSize, 2);
    });
  });

  describe('aggregates', function() {

    it('should correctly count declarations', function() {
      assert.equal(stats.aggregates.declarations, 20);
    });

    it('should correctly count selectors', function() {
      assert.equal(stats.aggregates.selectors, 11);
    });

    it('should correctly count the number of id selectors', function() {
      assert.equal(stats.aggregates.idSelectors, 1);
    });

    it('should correctly count the number of class selectors', function() {
      assert.equal(stats.aggregates.classSelectors, 8);
    });

    it('should correctly count the number of pseudo element selectors', function() {
      assert.equal(stats.aggregates.pseudoElementSelectors, 1);
    });

    it('should correctly count the number of pseudo class selectors', function() {
      assert.equal(stats.aggregates.pseudoClassSelectors, 3);
    });

    it('should correctly aggregate the repeated selectors', function() {
      assert.deepEqual(stats.aggregates.repeatedSelectors, ['.red']);
    });
  });

  describe('declarations', function() {

    it('should correctly count vendor prefixes', function() {
      assert.equal(stats.declarations.vendorPrefixCount, 5);
    });

    it('should correctly count important values', function() {
      assert.equal(stats.declarations.importantCount, 2);
    });

    it('should correctly count the number of unique declarations', function() {
      assert.equal(stats.declarations.uniqueDeclarationsCount, 19);
    })

    it('should correctly count the number of declarations that reset properties', function() {
      assert.deepEqual(stats.declarations.propertyResetDeclarations, {'margin': 1, 'marginBottom': 1});
    });
  });

  describe('keyframes', function() {
    var keyframeStats;

    before(function() {
      keyframeStats = cssstats(fixture('keyframes'));
    });

    it('should correctly get statistics for CSS in, and after, a keyframe', function() {
      assert.equal(keyframeStats.aggregates.color.total, 5);
      assert.equal(keyframeStats.aggregates.color.unique, 4);
    });
  });

  it('should be able to parse css and produce stats', function() {
    ['basscss', 'small', 'font-awesome', 'gridio', 'gridio-national-light'].forEach(function(stylesheet) {
      renderJson(stylesheet);
    });
  });
});

describe('font shorthand property', function() {
  var stats;

  before(function() {
    stats = cssstats(fixture('font-shorthand'));
  });

  it('should be able to grab the font-size declaration', function() {
    assert.equal(stats.aggregates.fontSize.total, 2);
  });

  it('should be able to grab the font-family declaration', function() {
    assert.equal(stats.aggregates.fontFamily.total, 1);
  });

  it('should be able to grab the font-weight declaration', function() {
    assert.equal(stats.aggregates.fontWeight.total, 1);
  });

  it('should be able to grab the font-style declaration', function() {
    assert.equal(stats.aggregates.fontStyle.total, 1);
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
