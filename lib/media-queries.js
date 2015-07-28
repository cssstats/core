
var _ = require('lodash')
var postcss = require('postcss')
var rules = require('./rules')
var selectors = require('./selectors')
var declarations = require('./declarations')

module.exports = function (root) {

  var result = {
    total: 0,
    unique: 0,
    values: [],
    contents: {} // Not sure what to name this
  }

  var queries = {}

  root.eachAtRule(function (rule) {
    if (rule.name === 'media') {
      var qRoot = postcss.parse(rule.nodes)
      result.total++
      result.values.push(rule.params)
      queries[rule.params] = queries[rule.params] && queries[rule.params].append(qRoot) || qRoot
    }
  })

  Object.keys(queries).map(function (key) {
    var stats = {}
    var qRoot = queries[key]
    stats.rules = rules(qRoot)
    stats.selectors = selectors(qRoot)
    stats.declarations = declarations(qRoot)
    result.contents[key] = stats
  })

  result.unique = _.uniq(result.values).length

  return result

}

