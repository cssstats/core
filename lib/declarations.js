
var camelcase = require('./camelcase');

module.exports = function(ast) {

  var index = 0;
  var result = {};
  result.all = [];
  result.byProperty = {};
  result.unique = {};
  result.byMedia = {};

  function parseMedia(rule) {
    var declarations = [];
    rule.rules.forEach(function(r) {
      if (!r.declarations) return;
      r.declarations.map(function(declaration) {
        declarations.push(declaration);
      })
    });
    return declarations;
  }

  ast.stylesheet.rules.forEach(function(rule) {
    if (rule.type == 'rule') {
      var declarations = rule.declarations;
    } else if (rule.type == 'media') {
      var declarations = parseMedia(rule);
    } else {
      return;
    }

    declarations.forEach(function(declaration) {
      if (declaration.property) {
        var propKey = camelcase(declaration.property);
        var isDupe = false;
        result.all.push(declaration);
        if (!result.byProperty[propKey]) {
          result.byProperty[propKey] = [];
          result.unique[propKey] = [index];
        }
        result.byProperty[propKey].push(index);

        result.byProperty[propKey].forEach(function(i) {
          if (result.all[i].value == declaration.value) {
            isDupe = true;
          }
        });
        if (!isDupe) {
          result.unique[propKey].push(index);
        }

        if (rule.type == 'media') {
          var key = camelcase(rule.media);
          if (!result.byMedia[key]) {
            result.byMedia[key] = [];
          }
          result.byMedia[key].push(index);
        }

        index++;

      }
    });


  });

  return result;

};

