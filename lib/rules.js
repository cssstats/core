
var _ = require('lodash')

module.exports = function (root, opts) {

  var result = {
    total: 0,
    size: {
      graph: [],
      max: 0,
      average: 0
    }
  }

  root.eachRule(function (rule) {
    var declarations = 0
    rule.nodes.forEach(function (node) {
      if (node.type === 'decl') {
        declarations++
      }
    })

    result.total++
    result.size.graph.push(declarations)

  })

  if (result.total > 0) {
    result.size.average = _.sum(result.size.graph) / result.size.graph.length
  }

  return result

}

