
var camelCase = require('camelcase');
var isVendorPrefixed = require('is-vendor-prefixed');

var fontShorthand = require('./util/font-shorthand');
var uniqueDeclarations = require('./util/unique-declarations')

module.exports = function(obj) {

  var index = 0;
  var result = {
    all: [],
    byProperty: {},
    unique: {},
    byMedia: {},
    importantCount: 0,
    vendorPrefixCount: 0
  };

  obj.eachRule(function(rule) {
    rule.eachDecl(function(declaration) {
      if (declaration.prop) {
        var propKey = camelCase(declaration.prop);

        if (isVendorPrefixed(declaration.prop)) {
          result.vendorPrefixCount++;
        }

        if (declaration.important) {
          result.importantCount++;
        }

        delete declaration.source;
        delete declaration.before;
        delete declaration.between;

        declaration.index = index;
        result.all.push(declaration);

        result.byProperty[propKey] = result.byProperty[propKey] || [];
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

  fontShorthand(result);
  result.unique = uniqueDeclarations(result);

  return result;

};
