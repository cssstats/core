
var camelCase = require('camelcase');
var isVendorPrefixed = require('is-vendor-prefixed');

var fontShorthand = require('./util/font-shorthand');
var uniqueDeclarations = require('./util/unique-declarations');

module.exports = function(obj) {
  var uniqueDeclarationsCache = {};

  var index = 0;
  var result = {
    all: [],
    byProperty: {},
    unique: {},
    byMedia: {},
    propertyResetDeclarations: {},
    importantCount: 0,
    vendorPrefixCount: 0,
    displayNoneCount: 0,
    uniqueDeclarationsCount: 0
  };

  obj.eachRule(function(rule) {
    rule.eachDecl(function(declaration) {
      if (declaration.prop) {
        uniqueDeclarationsCache[declaration.prop + ': ' + declaration.value + ';'] = true;

        var propKey = camelCase(declaration.prop);

        if (isVendorPrefixed(declaration.prop)) {
          result.vendorPrefixCount++;
        }

        if (declaration.important) {
          result.importantCount++;
        }

        if (declaration.prop === 'display' && declaration.value === 'none') {
          result.displayNoneCount++;
        }

        var relevant = ['margin', 'padding'].reduce(function (prop) {
          return propKey.indexOf(prop) >= 0;
        });
        if (relevant && declaration.value.match(/^(?:0(?:\w{2,4}|%)? ?)+$/)) {
          result.propertyResetDeclarations[propKey] |= 0;
          result.propertyResetDeclarations[propKey]++;
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

  result.uniqueDeclarationsCount = Object.keys(uniqueDeclarationsCache).length;

  fontShorthand(result);
  result.unique = uniqueDeclarations(result);

  return result;

};
