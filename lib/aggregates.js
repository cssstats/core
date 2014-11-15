
module.exports = function(obj) {

  var result = {};

  //result.rules = ast.stylesheet.rules.length;
  result.selectors = obj.selectors.length || 0;
  result.declarations = obj.declarations.all.length || 0;
  result.properties = Object.keys(obj.declarations.byProperty).length || 0;

  result.fontSizes = {};
  if (obj.declarations.byProperty.fontSize) {
    result.fontSizes.total = obj.declarations.byProperty.fontSize.length;
    result.fontSizes.unique = obj.declarations.unique.fontSize.length;
  }

  result.floats = {};
  if (obj.declarations.byProperty.float) {
    result.floats.total = obj.declarations.byProperty.float.length;
    result.floats.unique = obj.declarations.unique.float.length;
  }

  result.widths = {};
  if (obj.declarations.byProperty.width) {
    result.widths.total = obj.declarations.byProperty.width.length;
    result.widths.unique = obj.declarations.unique.width.length;
  }

  result.heights = {};
  if (obj.declarations.byProperty.height) {
    result.heights.total = obj.declarations.byProperty.height.length;
    result.heights.unique = obj.declarations.unique.height.length;
  }

  result.colors = {};
  if (obj.declarations.byProperty.color) {
    result.colors.total = obj.declarations.byProperty.color.length;
    result.colors.unique = obj.declarations.unique.color.length;
  }

  result.backgroundColors = {};
  if (obj.declarations.byProperty.backgroundColor) {
    result.backgroundColors.total = obj.declarations.byProperty.backgroundColor.length;
    result.backgroundColors.unique = obj.declarations.unique.backgroundColor.length;
  }

  return result;

};

