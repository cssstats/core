
var camelcase = require('./camelcase');

module.exports = function(obj) {

  var index = 0;
  var result = {};
  result.all = [];
  result.byProperty = {};
  result.unique = {};

    // TO DO: Create separate media queries array
    //result.byMedia = {};

  function removeContents(declarations) {
    declarations.forEach(function(d, i) {
      delete declarations[i].source;
      delete declarations[i].before;
      delete declarations[i].between;
    });
  }

  obj.eachRule(function(rule) {
    rule.eachDecl(function(declaration) {
      if (declaration.prop) {
        var propKey = camelcase(declaration.prop);
        var isDupe = false;
        result.all.push(declaration);
        if (!result.byProperty[propKey]) {
          result.byProperty[propKey] = [];
          result.unique[propKey] = [];
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

  removeContents(result.all);

  return result;

};

