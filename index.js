
var postcss = require('postcss');
var declarations = require('./lib/declarations');
var selectors = require('./lib/selectors');
var aggregates = require('./lib/aggregates');
var rules = require('./lib/rules');
var size = require('./lib/size');

module.exports = function(string, options) {

  options = options || {};

  var result = {};
  var obj = postcss.parse(string, options);

  if (!obj) return false;

  result.size = size(string);

  result.selectors = selectors(obj);
  result.declarations = declarations(obj);
  result.rules = rules(obj);
  result.aggregates = aggregates(result);

  return result;

};

