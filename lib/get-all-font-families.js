
var fontParser = require('cssfontparser')

module.exports = function (properties) {

  properties = properties || this.properties

  if (!properties) {
    return 0
  }

  var families = properties['font-family'] || []

  if (properties.font) {
    families = families.concat(properties.font
      .map(function (value) {
        return fontParser(value).family.join(', ') || false
      })
      .filter(function (value) {
        return value
      })
    )
  }

  return families

}

