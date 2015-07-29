
var specificity = require('specificity')
var parser = require('./selector-parser')

module.exports = function (selector) {

  if (typeof selector !== 'string') {
    return false
  }

  // css-selector-parser doesn't handle keyframe selectors
  if (selector.match(/\%$/)) {
    return false
  }

  var obj = parser.parse(selector)
  if (obj.rule.tagName) {
    return true
  }

  return false

}
