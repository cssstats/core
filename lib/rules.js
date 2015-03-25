
module.exports = function(obj) {

  var result = {
    rules: [],
    averageRuleSize: 0
  };

  var ruleCount = 0;
  var declarationsCount = 0;

  obj.eachRule(function(rule) {
    var declarations = [];
    rule.nodes.forEach(function(node) {
      if (node.type == 'decl') {
        declarations.push(node);
      }
    });

    declarationsCount += declarations.length;
    ruleCount++;

    result.rules.push({
      type: rule.type,
      childs: rule.nodes,
      declarations: declarations,
      selector: rule.selector
    });
  });

  if (ruleCount > 0) {
    result.averageRuleSize = declarationsCount/ruleCount;
  }

  return result;

};
