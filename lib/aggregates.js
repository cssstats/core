
module.exports = function(obj) {

  var result = {};

  //result.rules = ast.stylesheet.rules.length;
  result.selectors = obj.selectors.length || 0;
  result.declarations = obj.declarations.all.length || 0;
  result.properties = Object.keys(obj.declarations.byProperty).length || 0;

  result.fontSizes = {};
  result.fontSizes.total = obj.declarations.byProperty.fontSize.length || 0;
  result.fontSizes.unique = obj.declarations.unique.fontSize.length || 0;

  result.floats = {};
  result.floats.total = obj.declarations.byProperty.float.length || 0;
  result.floats.unique = obj.declarations.unique.float.length || 0;

  result.widths = {};
  result.widths.total = obj.declarations.byProperty.width.length || 0;
  result.widths.unique = obj.declarations.unique.width.length || 0;

  result.heights = {};
  result.heights.total = obj.declarations.byProperty.height.length || 0;
  result.heights.unique = obj.declarations.unique.height.length || 0;

  result.colors = {};
  result.colors.total = obj.declarations.byProperty.color.length || 0;
  result.colors.unique = obj.declarations.unique.color.length || 0;

  result.backgroundColors = {};
  result.backgroundColors.total = obj.declarations.byProperty.backgroundColor.length || 0;
  result.backgroundColors.unique = obj.declarations.unique.backgroundColor.length || 0;

  return result;

};

