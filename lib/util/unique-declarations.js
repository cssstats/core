var _uniq = require('lodash').uniq;

module.exports = function uniqueDeclarations(obj) {
  var uniqueDecls = {};

  Object.keys(obj.byProperty).forEach(function(propKey){
    uniqueDecls[propKey] = _uniq(obj.byProperty[propKey], 'value');
  });

  return uniqueDecls;
};
