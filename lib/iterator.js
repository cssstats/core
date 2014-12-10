
var camelcase = require('./camelcase');

module.exports = {
  /**
   * Loops over all declarations in AST,
   * calling the callback function with declaration object
   * and the rule object the declaration is in.
   */
  eachDeclaration: function(ast, fn) {
    ast.stylesheet.rules.forEach(function(rule) {
      declarationsFromRule(rule).forEach(function(declaration) {
        if (declaration.property) {
          fn(declaration, rule);
        }
      });
    });
  }
};

function declarationsFromRule(rule) {
  if (rule.type == 'rule') {
    return rule.declarations || [];
  } else if (rule.type == 'media') {
    return parseMedia(rule) || [];
  } else {
    return [];
  }
}

function parseMedia(rule) {
  var declarations = [];
  rule.rules.forEach(function(r) {
    if (!r.declarations) return;
    r.declarations.map(function(declaration) {
      declarations.push(declaration);
    });
  });
  return declarations;
}
