
var camelcase = require('./camelcase');

module.exports = function(ast) {

  var index = 0;
  var result = {};
  result.all = [];
  result.byProperty = {};
  result.unique = {};

  ast.stylesheet.rules.forEach(function(rule) {
    if (!rule.declarations) return;
    var declarations = rule.declarations;
    declarations.forEach(function(declaration) {
      if (declaration.property) {
        var propKey = camelcase(declaration.property);
        var isDupe = false;
        result.all.push(declaration);
        if (!result.byProperty[propKey]) {
          result.byProperty[propKey] = [];
          result.unique[propKey] = [index];
        }
        result.byProperty[propKey].forEach(function(i) {
          if (result.all[i].value == declaration.value) {
            isDupe = true;
          }
        });
        if (!isDupe) {
          result.unique[propKey].push(index);
        }
        result.byProperty[propKey].push(index);
        index++;
      }
    });
  });

  return result;

};

