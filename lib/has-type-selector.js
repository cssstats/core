
var parse = require('css-selector-tokenizer').parse

module.exports = function (selector) {

  if (typeof selector !== 'string') {
    return false
  }

  return parse(selector).nodes
    .reduce(function (a, b) {
      return a.concat(b.nodes)
    }, [])
    .reduce(function (a, b) {
      if (b.type === 'element') {
        return true
      }
      return a || false
    }, false)

}
