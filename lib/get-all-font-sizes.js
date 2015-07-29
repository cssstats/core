
var fontParser = require('cssfontparser')

module.exports = function (properties) {

  properties = properties || this.properties

  if (!properties) {
    return 0
  }

  var fontSizes = properties['font-size'] || []

  if (properties.font) {
    fontSizes = fontSizes.concat(properties.font
      .map(function (value) {
        return fontParser(value).size || false
      })
      .filter(function (value) {
        return value
      })
    )
  }

  return fontSizes

}

