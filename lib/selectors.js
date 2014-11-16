
var specificity = require('specificity');

module.exports = function(ast) {

  var graph = [];

  var parseMedia = function(rule) {
    var selectors = [];
    rule.rules.forEach(function(r) {
      r.selectors.map(function(selector) {
        selectors.push(selector);
      });
    });
    return selectors;
  }

  ast.stylesheet.rules.map(function(rule) {

    if (rule.type == 'rule') {
      var selectors = rule.selectors;
    } else if (rule.type == 'media') {
      var selectors = parseMedia(rule);
    } else {
      return;
    }

    selectors.forEach(function(selector) {
      if (selector.length === 0) return;
      var value = specificity.calculate(selector)[0];
      graph.push(value);
    });

  });

  return graph;

};
