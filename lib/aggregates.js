
module.exports = function(obj) {

  var result = {};

  //result.rules = ast.stylesheet.rules.length;
  result.selectors = obj.selectors.length;
  result.declarations = obj.declarations.all.length;
  result.properties = Object.keys(obj.declarations.byProperty).length;
  result.fontSizes = {
    total: obj.declarations.byProperty.fontSize.length,
    unique: obj.declarations.unique.fontSize.length
  };
  result.floats = {
    total: obj.declarations.byProperty.float.length,
    unique: obj.declarations.unique.float.length
  };
  result.widths = {
    total: obj.declarations.byProperty.width.length,
    unique: obj.declarations.unique.width.length
  };
  result.height = {
    total: obj.declarations.byProperty.height.length,
    unique: obj.declarations.unique.height.length
  };
  result.color = {
    total: obj.declarations.byProperty.color.length,
    unique: obj.declarations.unique.color.length
  };
  result.backgroundColor = {
    total: obj.declarations.byProperty.backgroundColor.length,
    unique: obj.declarations.unique.backgroundColor.length
  };

  return result;

};

