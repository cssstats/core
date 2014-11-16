
var camelcase = require('./camelcase');

module.exports = function(ast) {

  var index = 0;
  var result = {};
  result.all = [];
  result.byProperty = {};
  result.unique = {};
  result.byMedia = {};

  ast.stylesheet.rules.forEach(function(rule) {
    if (rule.type == 'rule') {
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
    } else if (rule.type == 'media') {
      var key = camelcase(rule.media);
      result.byMedia[key] = {};
      result.byMedia[key].all = [];
      rule.rules.forEach(function(r) {
        r.declarations.forEach(function(declaration) {
          result.byMedia[key].all.push(declaration);
        });
      });
    } else {
      return;
    }
  });

  return result;

};

