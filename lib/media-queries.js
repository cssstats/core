
var _ = require('lodash')
var postcss = require('postcss')
var rules = require('./rules')
var selectors = require('./selectors')
var declarations = require('./declarations')

module.exports = function (root, opts) {

  var result = {
    total: 0,
    unique: 0,
    values: [],
    contents: [] // Not sure what to name this
  }

  root.eachAtRule(function (rule) {
    if (rule.name === 'media') {
      var qRoot = postcss.parse(rule.nodes)
      result.total++
      result.values.push(rule.params)

      if (opts.mediaQueries) {
        result.contents.push({
          value: rule.params,
          rules: rules(qRoot, opts),
          selectors: selectors(qRoot, opts),
          declarations: declarations(qRoot, opts)
        })
      } else {
        delete result.contents
      }
    }
  })

  result.unique = _.uniq(result.values).length

  return result

}

