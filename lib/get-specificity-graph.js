
var specificity = require('specificity')

module.exports = function (selectors) {

  selectors = selectors || this.values

  if (!selectors) {
    return false
  }

  return selectors.map(graph)

  function graph (selector) {
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

}

