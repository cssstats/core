
module.exports = function(string) {
 
  var STRING_CAMELIZE_REGEXP = /(\-|_|\.|\s)+(.)?/g;

  return string.replace(STRING_CAMELIZE_REGEXP, function(match, separator, chr) {
    if (chr) {
      return chr.toUpperCase();
    } else {
      return '';
    }
  }).replace(/^([A-Z])/, function(match, separator, chr) {
    return match.toLowerCase();
  });

};
