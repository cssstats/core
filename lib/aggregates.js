
module.exports = function(obj) {

  var result = {};

  result.selectors = obj.selectors.length || 0;
  result.declarations = obj.declarations.all.length || 0;
  result.properties = Object.keys(obj.declarations.byProperty) || [];
  result.mediaQueries = Object.keys(obj.declarations.byMedia) || [];

  function parseTotalUnique(key) {
    var totalUnique = {};
    totalUnique.total = obj.declarations.byProperty[key].length || 0;
    totalUnique.unique = obj.declarations.unique[key].length || 0;
    return totalUnique;
  }

  result.properties.forEach(function(key) {
    result[key] = parseTotalUnique(key);
  });

  return result;

};
