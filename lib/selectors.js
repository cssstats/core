var specificity = require('specificity');
var hasIdSelector = require('has-id-selector');
var hasClassSelector = require('has-class-selector');
var hasPseudoElement = require('has-pseudo-element');
var hasPseudoClass = require('has-pseudo-class');

module.exports = function(obj) {

  var result = {
    selectors: [],
    averageSpecificity: 0,
    idSelectors: 0,
    classSelectors: 0,
    pseudoElementSelectors: 0,
    pseudoClassSelectors: 0
  };

  var selectorCount = 0;
  var specificityTotal = 0;

  function parseSpecificityBaseTen(selector) {
    var values = selector.specificity.split(',');
    var a = parseInt(values[0], 10) * 1000;
    var b = parseInt(values[1], 10) * 100;
    var c = parseInt(values[2], 10) * 10;
    var d = parseInt(values[3], 10);
    if (a > 10000) a = 10000;
    if (b > 1000) b = 1000;
    if (c > 100) c = 100;
    if (d > 10) d = 10;
    return (a + b + c + d);
  }

  obj.eachRule(function(rule) {
    rule.selectors.forEach(function(selector) {
      var s = specificity.calculate(selector)[0];
      s.specificity_10 = parseSpecificityBaseTen(s);
      specificityTotal += s.specificity_10;

      result.selectors.push(s);
      selectorCount++;

      if (hasClassSelector(selector)) {
        result.classSelectors++;
      }

      if (hasIdSelector(selector)) {
        result.idSelectors++;
      }

      if (hasPseudoElement(selector)) {
        result.pseudoElementSelectors++;
      }

      if (hasPseudoClass(selector)) {
        result.pseudoClassSelectors++;
      }
    });
  });

  if (selectorCount > 0) {
    result.averageSpecificity = specificityTotal/selectorCount;
  }

  return result;

};
