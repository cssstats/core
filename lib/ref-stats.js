
/* Reference
   parseCss: function(cssString) {
   cssRules = cssParse(cssunminifier.unminify(cssString));
*/

var _ = require('lodash');

var STRING_CAMELIZE_REGEXP = /(\-|_|\.|\s)+(.)?/g
var ELEMENT_REGEXP = /^[a-zA-Z]|\s(?=[a-zA-Z])/g

var util = {
  camelize: function(str) {
    return str.replace(STRING_CAMELIZE_REGEXP, function(match, separator, chr) {
      if (chr) {
        return chr.toUpperCase();
      } else {
        return '';
      }
    }).replace(/^([A-Z])/, function(match, separator, chr) {
      return match.toLowerCase();
    });
  }
};

module.exports = function(ast) {
  var css, cssRules, guid, relative, response;
  cssRules = ast;
  guid = 0;
  css = {
    rules: [],
    selectors: [],
    decs: [],
    decsByProperty: {
      all: {
        ids: []
      },
      unique: {
        ids: []
      }
    }
  };
  _.forEach(cssRules.stylesheet.rules, function(rule) {
    var newRule;
    newRule = {
      selectors: [],
    declarations: []
    };
    if (rule.selectors) {
      _.forEach(rule.selectors, function(selector) {
        var item, selectorId;
        selectorId = guid++;
        item = {
          id: selectorId,
        string: selector,
        //score: util.specificityScore(selector)
        };
        css.selectors.push(item);
        return newRule.selectors.push(selector);
      });
    }
    if (rule.declarations) {
      _.forEach(rule.declarations, function(dec) {
        var camelizedProperty, declarationId, property, shorthand;
        delete dec.type;
        declarationId = dec.id = guid++;
        if (dec.value) {
          property = dec.property;
          shorthand = property.match(/^(margin|padding)/g);
          if (shorthand) {
            property = shorthand[0];
          }
          css.decs.push(dec);
          camelizedProperty = util.camelize(property);
          if (!css.decsByProperty.all[camelizedProperty]) {
            css.decsByProperty.all[camelizedProperty] = [];
          }
          //if (dec.property === 'font-size') {
          //  dec.pxValue = util.fontSizeToPx(dec.value);
          //}
          css.decsByProperty.all.ids.push(declarationId);
          css.decsByProperty.all[camelizedProperty].push(declarationId);
          return newRule.declarations.push(declarationId);
        }
      });
      if (rule.selectors && rule.declarations) {
        return css.rules.push(newRule);
      }
    }
  });
  _.forEach(css.decsByProperty.all, function(ids, property) {
    var decs, unique;
    decs = _.filter(css.decs, function(dec) {
      return ids.indexOf(dec.id) !== -1;
    });
    unique = _.unique(decs, function(dec) {
      return dec.value;
    });
    return css.decsByProperty.unique[property] = _.map(unique, function(dec) {
      css.decsByProperty.unique.ids.push(dec.id);
      return dec.id;
    });
  });
  //(relative = function() {
  //  var all;
  //  all = css.decsByProperty.all;
  //  return _.forEach(['margin', 'padding', 'width', 'height'], function(property) {
  //    return util.toRelative(_.map(all[property], function(id) {
  //      return _.find(css.decs, {
  //        id: id
  //      });
  //    }));
  //  });
  //})();
  return response = {
    counts: {
      selectors: css.selectors.length,
      uniqueDecs: _.keys(css.decsByProperty.unique).length
    },
    rules: css.rules,
    decs: css.decs,
    decsByProperty: {
      all: css.decsByProperty.all,
      unique: css.decsByProperty.unique
    },
    selectors: css.selectors
  };
}
