
module.exports = function(obj) {

  var result = [];

  obj.eachRule(function(rule) {
    var declarations = [];
    rule.childs.forEach(function(child) {
      if (child.type == 'decl') {
        declarations.push(child);
      }
    });
    result.push({
      type: rule.type,
      childs: rule.childs,
      declarations: declarations,
      selector: rule.selector
    });
  });

  return result;

};

