
module.exports = function(obj) {

  var result = [];

  obj.eachRule(function(rule) {
    result.push({
      type: rule.type,
      childs: rule.childs,
      selector: rule.selector
    });
  });

  return result;

};

