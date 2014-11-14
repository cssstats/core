
var fs = require('fs');
var css = require('css');
var declarations = require('./lib/declarations');
var specificityGraph = require('./lib/specificity-graph');

// Reference from CSSStats
//var ref = require('./lib/ref-stats');

module.exports = function(string, options) {

  options = options || {};

  var result = {};
  var ast = css.parse(string);

  result.graph = specificityGraph(ast);
  result.declarations = declarations(ast);

  return result;

};

