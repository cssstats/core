
var isVendorPrefixed = require('is-vendor-prefixed')
var getPropertyResets = require('./get-property-resets')
var getUniquePropertyCount = require('./get-unique-property-count')
var getPropertyValueCount = require('./get-property-value-count')

module.exports = function (root, opts) {

  var result = {
    total: 0,
    important: 0,
    vendorPrefix: 0,
    properties: {},
    getPropertyResets: getPropertyResets,
    getUniquePropertyCount: getUniquePropertyCount,
    getPropertyValueCount: getPropertyValueCount
  }

  root.eachRule(function (rule) {
    rule.eachDecl(function (declaration) {

      var prop = declaration.prop

      result.total++

      if (isVendorPrefixed(declaration.prop)) {
        result.vendorPrefix++
      }

      if (declaration.important) {
        result.important++
      }

      result.properties[prop] = result.properties[prop] || []
      result.properties[prop].push(declaration.value)

    })
  })

  return result

}

