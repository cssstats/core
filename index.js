
var postcss = require('postcss');
var gzipSize = require('gzip-size');
var declarations = require('./lib/declarations');
var selectors = require('./lib/selectors');
var aggregates = require('./lib/aggregates');
var rules = require('./lib/rules');
var size = require('./lib/size');

module.exports = function(string, options) {

  var options = options || {};
  options.safe = options.safe || true;

  var result = {};
  var obj = postcss.parse(string, options);

  if (!obj) return false;

  result.averages = {};
  result.size = size(string);
  result.gzipSize = gzipSize.sync(string);

  var selectorStats = selectors(obj);
  result.selectors = selectorStats.selectors;
  result.averages.specificity = selectorStats.averageSpecificity;

  var ruleStats = rules(obj);
  result.rules = ruleStats.rules;
  result.averages.ruleSize = ruleStats.averageRuleSize;

  result.declarations = declarations(obj);
  result.aggregates = aggregates(result);

  result.aggregates.idSelectors = selectorStats.idSelectors;
  result.aggregates.classSelectors = selectorStats.classSelectors;

  return result;

};
