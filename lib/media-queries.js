
var _ = require('lodash')

module.exports = function (root) {

  var result = {
    total: 0,
    unique: 0,
    values: []
  }

  root.eachAtRule(function (rule) {
    if (rule.name === 'media') {
      console.log(rule)
      result.total++
      result.values.push(rule.params)
    }
  })

  var uniques = _.uniq(result.values)
  result.unique = uniques.length

  return result

}

