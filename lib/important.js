
var iterator = require('./iterator');

module.exports = {
  /**
   * Strips !important from declaration values and
   * adds important:true property to these declarations.
   */
  annotate: function(ast) {
    iterator.eachDeclaration(ast, function(declaration) {
      if (/!important$/.test(declaration.value)) {
        declaration.value = declaration.value.replace(/\s*!important$/, "");
        declaration.important = true;
      }
    });

    return ast;
  }
};

