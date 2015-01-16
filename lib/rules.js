
module.exports = function(obj) {

  var result = [];

  var result = {
    rules: [],
    averageRuleSize: 0
  };

  var ruleCount = 0;
  var declarationsCount = 0;

  obj.eachRule(function(rule) {
    var declarations = [];
    rule.childs.forEach(function(child) {
      if (child.type == 'decl') {
        declarations.push(child);
      }
    });

    declarationsCount += declarations.length;
    ruleCount++;

    result.rules.push({
      type: rule.type,
      childs: rule.childs,
      declarations: declarations,
      selector: rule.selector
    });
  });

  if (ruleCount > 0) {
    result.averageRuleSize = declarationsCount/ruleCount;
  }

  return result;

};
