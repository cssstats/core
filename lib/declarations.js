
var iterator = require('./iterator');
var camelcase = require('./camelcase');

module.exports = function(ast) {

  var index = 0;
  var result = {};
  result.all = [];
  result.byProperty = {};
  result.unique = {};
  result.byMedia = {};

  iterator.eachDeclaration(ast, function(declaration, rule) {
    var propKey = camelcase(declaration.property);
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

    if (rule.type == 'media') {
      var key = camelcase(rule.media);
      if (!result.byMedia[key]) {
        result.byMedia[key] = [];
      }
      result.byMedia[key].push(index);
    }

    index++;
  });

  return result;

};

