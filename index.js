
var _ = require('lodash')
var postcss = require('postcss')
var gzipSize = require('gzip-size')
var declarations = require('./lib/declarations')
var selectors = require('./lib/selectors')
var aggregates = require('./lib/aggregates')
var rules = require('./lib/rules')
var size = require('./lib/size')

module.exports = function(cssStringOrAST, options) {

  options = options || {}
  options.safe = options.safe || true

  var obj
  var string
  var results = {}

  if (_.isString(cssStringOrAST)) {
    obj = postcss.parse(cssStringOrAST, options)
    string = cssStringOrAST
  } else if (_.isObject(cssStringOrAST)) {
    obj = cssStringOrAST
    string = obj.toString()
  } else {
    throw new TypeError('cssstats expects a string or PostCSS AST')
  }

  if (!obj) { return false }

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

  return results

}
