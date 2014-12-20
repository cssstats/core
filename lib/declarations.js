
var camelcase = require('./camelcase');

module.exports = function(obj) {

  var index = 0;
  var result = {};
  result.all = [];
  result.byProperty = {};
  result.unique = {};

    // TO DO: Create separate media queries array
  result.byMedia = {};

  obj.eachRule(function(rule) {
    rule.eachDecl(function(declaration) {
      if (declaration.prop) {
        var propKey = camelcase(declaration.prop);
        var isDupe = false;
        delete declaration.source;
        delete declaration.before;
        delete declaration.between;
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

  obj.eachAtRule(function(atRule) {
    //console.log(atRule);
    if (atRule.name != 'media') return;
    var key = camelcase(atRule.params);
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

