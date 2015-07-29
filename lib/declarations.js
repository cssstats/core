
var getPropertyResets = require('./get-property-resets')
var getUniquePropertyCount = require('./get-unique-property-count')
var getPropertyValueCount = require('./get-property-value-count')
var getVendorPrefixedProperties = require('./get-vendor-prefixed-properties')

module.exports = function (root, opts) {

  var result = {
    total: 0,
    important: [],
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
        result.important.push({
          property: declaration.prop,
          value: declaration.value
        })
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

  if (!opts.importantDeclarations) {
    delete result.important
  }

  return result

}

