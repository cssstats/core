
var _ = require('lodash')
var postcss = require('postcss')
var gzipSize = require('gzip-size')
// var declarations = require('./lib/declarations')
var selectors = require('./lib/selectors')
// var aggregates = require('./lib/aggregates')
// var rules = require('./lib/rules')
var size = require('./lib/size')

module.exports = function(src, opts) {

  opts = opts || {}
  opts = _.defaults(opts, {
    safe: true,
    lite: false
  })

  function parse(root, result) {

    var stats = {}

    var string = postcss().process(root).css
    stats.size = size(string)
    stats.gzipSize = gzipSize.sync(string)

    stats.rules = {}
    stats.selectors = {}
    stats.rules.total = 0
    stats.selectors.total = 0

    root.eachRule(function(rule) {
      stats.rules.total++
      rule.selectors.forEach(function(selector) {
        stats.selectors.total++
      })
    })

    stats.aggregates = {}

    // Add extra stats when lite option is not set
    if (!opts.lite) {
      _.assign(stats, {
      })
    }

    // Push message to PostCSS when used as a plugin
    if (result && result.messages) {
      result.messages.push({
        type:    'cssstats',
        plugin:  'postcss-cssstats',
        stats: stats
      })
    }

    // Return stats for default usage
    return stats

  }

  if (typeof src === 'string') {
    // Default behavior
    var root = postcss.parse(src, { safe: true })
    var result = parse(root, {})
    return result
  } else if (typeof src === 'object' || typeof src === 'undefined') {
    // Return a PostCSS plugin
    return parse
  } else {
    throw new TypeError('cssstats expects a string or to be used as a PostCSS plugin')
  }


}

/* v1 Object
  results.averages = {}
  results.size = size(string)
  results.gzipSize = gzipSize.sync(string)

  var selectorStats = selectors(obj)
  results.selectors = selectorStats.selectors
  results.averages.specificity = selectorStats.averageSpecificity

  var ruleStats = rules(obj)
  results.rules = ruleStats.rules
  results.averages.ruleSize = ruleStats.averageRuleSize

  results.declarations = declarations(obj)
  results.aggregates = aggregates(results)

  results.aggregates.idSelectors = selectorStats.idSelectors
  results.aggregates.classSelectors = selectorStats.classSelectors
  results.aggregates.repeatedSelectors = selectorStats.repeatedSelectors
  results.aggregates.pseudoClassSelectors = selectorStats.pseudoClassSelectors
  results.aggregates.pseudoElementSelectors = selectorStats.pseudoElementSelectors
*/

