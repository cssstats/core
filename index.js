
var fs = require('fs');
var css = require('css');
var declarations = require('./lib/declarations');
var selectors = require('./lib/selectors');
var properties = require('./lib/properties');

module.exports = function(string, options) {

  options = options || {};

  var result = {};
  var ast = css.parse(string);

  result.selectors = selectors(ast);
  result.declarations = declarations(ast);
  result.properties = properties(ast);

  return result;

};

