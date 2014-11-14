
var camelcase = require('./camelcase');

module.exports = function(ast) {

  var result = {};
  var declarationId = 0;
  result.declarations = [];
  result.declarationsByProperty = {};
  
  ast.stylesheet.rules.forEach(function(rule) {
    if (!rule.declarations) return;
    rule.declarations.forEach(function(declaration) {
      if (declaration.property) {
        var propKey = camelcase(declaration.property);
        result.declarations.push(declaration);
        if (!result.declarationsByProperty[propKey]) {
          result.declarationsByProperty[propKey] = [];
        }
        result.declarationsByProperty[propKey].push(declarationId);
        declarationId++;
      }
    });
  });

  return result;

};

