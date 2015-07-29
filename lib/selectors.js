
var _ = require('lodash')
var hasIdSelector = require('has-id-selector')
var hasClassSelector = require('has-class-selector')
var hasPseudoElement = require('has-pseudo-element')
var hasPseudoClass = require('has-pseudo-class')

var getSpecificityGraph = require('./get-specificity-graph')

module.exports = function (root, opts) {

  var result = {
    total: 0,
    id: 0,
    class: 0,
    type: 0,
    pseudoClass: 0,
    pseudoElement: 0,
    repeated: [],
    values: [],
    specificity: {
      // graph: [],
      max: 0,
      average: 0
    },
    getSpecificityGraph: getSpecificityGraph
  }

  root.eachRule(function (rule) {
    var graph
    rule.selectors.forEach(function (selector) {
      result.total++
      result.values.push(selector)

      // Add type selector check

      if (hasClassSelector(selector)) {
        result.class++
      }

      if (hasIdSelector(selector)) {
        result.id++
      }

      if (hasPseudoElement(selector)) {
        result.pseudoElement++
      }

      if (hasPseudoClass(selector)) {
        result.pseudoClass++
      }
    })

    graph = result.getSpecificityGraph()
    result.specificity.max = _.max(graph)
    result.specificity.average = _.sum(graph) / graph.length

    if (!opts.lite) {
      result.repeated = _.uniq(
        _.clone(result.values)
          .sort()
          .reduce(function (a, b, i, arr) {
            if (b === arr[i - 1] || b === arr[i + 1]) {
              return a.concat(b)
            } else {
              return a
            }
          }, [])
        )
    }
  })

  if (opts.lite) {
    delete result.repeated
    delete result.values
    delete result.specificity.graph
  }

  return result

}

