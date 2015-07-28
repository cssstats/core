
var _ = require('lodash')
var postcss = require('postcss')
var gzipSize = require('gzip-size')
var size = require('./lib/size')
var rules = require('./lib/rules')
var selectors = require('./lib/selectors')
var declarations = require('./lib/declarations')
var mediaQueries = require('./lib/media-queries')

module.exports = function (src, opts) {

  opts = opts || {}
  opts = _.defaults(opts, {
    safe: true
  })

  function parse (root, result) {

    var stats = {}

    var string = postcss().process(root).css
    stats.size = size(string)
    stats.gzipSize = gzipSize.sync(string)

    stats.rules = rules(root)
    stats.selectors = selectors(root)
    stats.declarations = declarations(root)
    stats.mediaQueries = mediaQueries(root)

    stats.aggregates = {}

    // Add extra stats when lite option is not set
    // if (!opts.lite) {
    //   _.assign(stats, {
    //   })
    // }

    // Push message to PostCSS when used as a plugin
    if (result && result.messages) {
      result.messages.push({
        type: 'cssstats',
        plugin: 'postcss-cssstats',
        stats: stats
      })
    }

    // Return stats for default usage
    return stats

  }

  if (typeof src === 'string') {
    // Default behavior
    var root = postcss.parse(src, { safe: true })
    var result = parse(root, {})
    return result
  } else if (typeof src === 'object' || typeof src === 'undefined') {
    // Return a PostCSS plugin
    return parse
  } else {
    throw new TypeError('cssstats expects a string or to be used as a PostCSS plugin')
  }

}

