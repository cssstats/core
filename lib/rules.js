
module.exports = function(ast) {

  var result = [];

  ast.stylesheet.rules.forEach(function(rule) {
    if (rule.type == 'rule' && rule.declarations) {
      result.push(rule);
    } else if (rule.type == 'media') {
      rule.rules.forEach(function(mediaRule) {
        result.push(mediaRule);
      });
    }
  });

  return result;

};

