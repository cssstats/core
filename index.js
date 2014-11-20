
var css = require('css');
var declarations = require('./lib/declarations');
var selectors = require('./lib/selectors');
var aggregates = require('./lib/aggregates');
var size = require('./lib/size');

module.exports = function(string, options) {

  options = options || {};

  var result = {};
  var ast = css.parse(string, options);

  if (!ast) return false;

  result.size = size(string);

  result.selectors = selectors(ast);
  result.declarations = declarations(ast);

  result.aggregates = aggregates(result);
  result.aggregates.rules = ast.stylesheet.rules.length;

  return result;

};

