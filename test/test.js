
var fs = require('fs')
var assert = require('assert')
var postcss = require('postcss')
var cssstats = require('..')

describe('css-statistics', function () {
  var stats

  before(function () {
    stats = cssstats(fixture('small'))
  })

  describe('PostCSS plugin', function () {
    it('should be handled correctly', function (done) {
      postcss()
        .use(cssstats())
        .process(fixture('small'))
        .then(function (result) {
          var pluginStats = result.messages[0].stats
          assert.deepEqual(pluginStats.selectors, stats.selectors)
          done()
        })
    })
  })

  describe('base stats', function () {
    it('should calculate the correct file size', function () {
      assert.equal(stats.size, 827)
    })

    it('should calculate the correct gzipped file size', function () {
      assert.equal(stats.gzipSize, 336)
    })
  })

  describe('averages', function () {
    it('should correctly count specificity stats', function () {
      assert.equal(stats.selectors.specificity.average, 20.272727272727273)
    })

    it('should correctly count rule size stats', function () {
      assert.equal(stats.rules.size.average, 2)
    })
  })

  describe('totals', function () {
    it('should correctly count declarations', function () {
      assert.equal(stats.declarations.total, 20)
    })

    it('should correctly count selectors', function () {
      assert.equal(stats.selectors.total, 11)
    })

    it('should correctly count the number of id selectors', function () {
      assert.equal(stats.selectors.id, 1)
    })

    it('should correctly count the number of class selectors', function () {
      assert.equal(stats.selectors.class, 8)
    })

    it('should correctly count the number of pseudo element selectors', function () {
      assert.equal(stats.selectors.pseudoElement, 1)
    })

    it('should correctly count the number of pseudo class selectors', function () {
      assert.equal(stats.selectors.pseudoClass, 3)
    })

    it('should correctly aggregate the repeated selectors', function () {
      assert.deepEqual(stats.selectors.getRepeatedValues(), ['.red'])
    })
  })

  describe('declarations', function () {
    it('should correctly count vendor prefixes', function () {
      assert.equal(stats.declarations.vendorPrefix, 5)
    })

    it('should correctly count important values', function () {
      assert.equal(stats.declarations.important, 2)
    })
  })

  describe('keyframes', function () {
    var keyframeStats

    before(function () {
      keyframeStats = cssstats(fixture('keyframes'))
    })

    it('should correctly get statistics for CSS in, and after, a keyframe', function () {
      assert.equal(keyframeStats.declarations.properties.color.length, 5)
    })
  })

  describe('selector methods', function () {
    it('should generate a specificity graph', function () {
      assert.deepEqual(stats.selectors.getSpecificityGraph(), [ 10, 100, 10, 10, 11, 30, 10, 20, 20, 1, 1 ])
    })

    it('should return a sorted specificity array', function () {
      assert.deepEqual(stats.selectors.getSortedSpecificity(), [ { selector: '#foo', specificity: 100 }, { selector: '.sm-tomato:first-child:last-child', specificity: 30 }, { selector: '.box:first-child', specificity: 20 }, { selector: '.box:last-child', specificity: 20 }, { selector: '.sm-tomato::after', specificity: 11 }, { selector: '.red', specificity: 10 }, { selector: '.box', specificity: 10 }, { selector: '.sm-tomato', specificity: 10 }, { selector: '.red', specificity: 10 }, { selector: '0%', specificity: 1 }, { selector: '100%', specificity: 1 } ])
    })
  })

  describe('declaration methods', function () {
    it('should correctly count the number of declarations that reset properties', function () {
      assert.deepEqual(stats.declarations.getPropertyResets(), {'margin': 1, 'margin-bottom': 1})
    })

    it('should correctly count the number of unique colors', function () {
      assert.equal(stats.declarations.getUniquePropertyCount('color'), 2)
    })

    it('should correctly count the number of color: red', function () {
      assert.equal(stats.declarations.getPropertyValueCount('color', 'red'), 2)
    })
  })

  it('should be able to parse css and produce stats', function (done) {
    [
      'basscss',
      'small',
      // 'font-awesome',
      'gridio',
      'gridio-national-light'
    ].forEach(function (stylesheet) {
      renderJson(stylesheet)
    })
    done()
  })
})

describe('cssstats lite', function () {
  var stats

  before(function () {
    stats = cssstats(fixture('small'), { lite: true, mediaQueries: false })
  })

  it('should not contain rulesize graph', function () {
    assert.equal(stats.rules.size.graph, null)
  })

  it('should not contain selector values', function () {
    assert.equal(stats.selectors.values, null)
  })

  it('should not contain media query contents', function () {
    assert.equal(stats.mediaQueries.contents, null)
  })

})

function fixture (name) {
  return fs.readFileSync('test/fixtures/' + name + '.css', 'utf8').toString().trim()
}

function renderJson (filename) {
  var css = fixture(filename)
  var obj = cssstats(css)
  fs.writeFileSync('./test/results/' + filename + '.json', JSON.stringify(obj, null, 2))
}

