
var isVendorPrefixed = require('is-vendor-prefixed')
var getPropertyResets = require('./get-property-resets')

module.exports = function (root, opts) {

  var result = {
    total: 0,
    important: 0,
    vendorPrefix: 0,
    properties: {},
    getPropertyResets: getPropertyResets
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

      /*
      if (!opts.lite) {
        // This doesn't seem to be working as intended
        var relevant = ['margin', 'padding'].reduce(function (p) {
          return prop.indexOf(p) >= 0
        })
        if (relevant && declaration.value.match(/^(?:0(?:\w{2,4}|%)? ?)+$/)) {
          result.resets[prop] |= 0
          result.resets[prop]++
        }
      }
      */

    })
  })

  return result

}

