
var _ = require('lodash')
var specificity = require('specificity')
var hasIdSelector = require('has-id-selector')
var hasClassSelector = require('has-class-selector')
var hasPseudoElement = require('has-pseudo-element')
var hasPseudoClass = require('has-pseudo-class')

module.exports = function(root) {

  var repeatedSelectorsCache = {}

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
      graph: [],
      max: 0,
      average: 0
    }
  }

  function specificityGraph(selector) {
    return specificity.calculate(selector)[0]
      .specificity
      .split(',')
      .map(function (n) {
        return parseFloat(n)
      })
      .reverse()
      .reduce(function (a, b, i, arr) {
        b = b < 10 ? b : 9
        return a + (b * Math.pow(10, i))
      })
  }


  root.eachRule(function(rule) {
    var graph
    rule.selectors.forEach(function(selector) {
      result.total++
      result.values.push(selector)

      repeatedSelectorsCache[selector] = repeatedSelectorsCache[selector] || 0
      repeatedSelectorsCache[selector]++

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

    graph = result.values.map(specificityGraph)
    result.specificity.graph = graph
    result.specificity.max = _.max(graph)
    result.specificity.average = _.sum(graph) / graph.length
  })

  Object.keys(repeatedSelectorsCache)
    .forEach(function(selector) {
      if (repeatedSelectorsCache[selector] && repeatedSelectorsCache[selector] > 1) {
        result.repeated.push(selector)
      }
    })

  return result

}

