var _uniq = require('lodash').uniq;

module.exports = function uniqueDeclarations(obj) {
  uniqueDecls = {};

  Object.keys(obj.byProperty).forEach(function(propKey){
    uniqueDecls[propKey] = _uniq(obj.byProperty[propKey], 'value');
  });

  return uniqueDecls;
}
