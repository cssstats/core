
var camelcase = require('./camelcase');

module.exports = function(ast) {

  var result = {};
  var index = 0;
  result.all = [];
  result.byProperty = {};
  result.unique = {};
  
  ast.stylesheet.rules.forEach(function(rule) {
    if (!rule.declarations) return;
    rule.declarations.forEach(function(declaration) {
      if (declaration.property) {
        var propKey = camelcase(declaration.property);
        result.all.push(declaration);
        if (!result.byProperty[propKey]) {
          result.byProperty[propKey] = [];
          result.unique[propKey] = [index];
        }
        result.byProperty[propKey].push(index);

        if (declaration.value != result.all[result.byProperty[propKey][0]].value) {
          result.unique[propKey].push(index);
        }

        index++;
      }
    });
  });

  return result;

};

