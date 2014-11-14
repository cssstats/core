
var specificity = require('specificity');

module.exports = function(ast) {

  var graph = [];

  ast.stylesheet.rules.map(function(rule) {

    var selectors = rule.selectors;
    if (typeof selectors === 'undefined') return;

    selectors.forEach(function(selector) {
      if (selector.length === 0) return;
      var value = specificity.calculate(selector)[0];
      graph.push(value);
    });

  });

  return graph;

};
