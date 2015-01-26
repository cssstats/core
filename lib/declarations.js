
var camelCase = require('camelcase');

module.exports = function(obj) {

  var index = 0;
  var result = {
    all: [],
    byProperty: {},
    unique: {},
    byMedia: {}
  };

  obj.eachRule(function(rule) {
    rule.eachDecl(function(declaration) {
      if (declaration.prop) {
        var propKey = camelCase(declaration.prop);
        var isDupe = false;
        delete declaration.source;
        delete declaration.before;
        delete declaration.between;
        declaration.index = index;
        result.all.push(declaration);
        if (!result.byProperty[propKey]) {
          result.byProperty[propKey] = [];
          result.unique[propKey] = [];
        }
        result.byProperty[propKey].forEach(function(d, i) {
          if (result.all[d.index].value == declaration.value) {
            isDupe = true;
          }
        });
        if (!isDupe) {
          result.unique[propKey].push(declaration);
        }
        result.byProperty[propKey].push(declaration);
        index++;
      }
    });
  });

  obj.eachAtRule(function(atRule) {
    if (atRule.name != 'media') return;
    var key = camelCase(atRule.params);
    if (!result.byMedia[key]) {
      result.byMedia[key] = [];
    }
    atRule.eachRule(function(rule) {
      rule.eachDecl(function(declaration) {
        result.byMedia[key].push(declaration);
      });
    });
  });

  return result;

};
