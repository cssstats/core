
var getPropertyResets = require('./get-property-resets')
var getUniquePropertyCount = require('./get-unique-property-count')
var getPropertyValueCount = require('./get-property-value-count')
var getVendorPrefixedProperties = require('./get-vendor-prefixed-properties')

module.exports = function (root, opts) {

  var result = {
    total: 0,
    important: 0,
    properties: {},
    getPropertyResets: getPropertyResets,
    getUniquePropertyCount: getUniquePropertyCount,
    getPropertyValueCount: getPropertyValueCount,
    getVendorPrefixed: getVendorPrefixedProperties,
  }

  root.eachRule(function (rule) {
    rule.eachDecl(function (declaration) {

      var prop = declaration.prop

      result.total++

      if (declaration.important) {
        result.important++
      }

      result.properties[prop] = result.properties[prop] || []
      result.properties[prop].push(declaration.value)

    })
  })

  if (opts.propertyResets) {
    result.resets = result.getPropertyResets()
  }

  if (opts.vendorPrefixedProperties) {
    result.vendorPrefixes = result.getVendorPrefixed()
  }

  return result

}

