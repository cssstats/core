
var _ = require('lodash')
var camelCase = require('camelcase')
var isVendorPrefixed = require('is-vendor-prefixed')

// var fontShorthand = require('./util/font-shorthand')
// var uniqueDeclarations = require('./util/unique-declarations')

module.exports = function(root) {

  var result = {
    total: 0,
    important: 0,
    vendorPrefix: 0,
    properties: {},
    resets: {}
      // This could be determined from the properties object
      // displayNoneCount: 0,
      // uniqueDeclarationsCount: 0
  }

  root.eachRule(function(rule) {
    rule.eachDecl(function(declaration) {

      var prop = declaration.prop
      result.properties[prop] = result.properties[prop] ||  []
      result.properties[prop].push(declaration.value)

      if (isVendorPrefixed(declaration.prop)) {
        result.vendorPrefix++
      }

      if (declaration.important) {
        result.important++
      }

      // This doesn't seem to be working as intended
      var relevant = ['margin', 'padding'].reduce(function (p) {
        return prop.indexOf(p) >= 0
      })
      if (relevant && declaration.value.match(/^(?:0(?:\w{2,4}|%)? ?)+$/)) {
        result.resets[prop] |= 0
        result.resets[prop]++
      }

    })
  })

  // This seems like something that belongs at the presentation layer, not the core
  // fontShorthand(result)

  return result

}

