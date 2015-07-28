# CSS Statistics
Parses stylesheets and returns an object with statistics

Used in http://cssstats.com

## Installation

```sh
npm install --save cssstats
```

## Usage

### Node

```js
var fs = require('fs')
var cssstats = require('csstats')

var css = fs.readFileSync('./styles.css', 'utf8')
var stats = cssstats(css)
```

### PostCSS Plugin

CSS Stats can be used as a [PostCSS](https://github.com/postcss/postcss) plugin.
The stats will be added to PostCSS's messages array.

```js
var fs = require('fs')
var postcss = require('postcss')
var cssstats = require('csstats')

var css = fs.readFileSync('./styles.css', 'utf8')
postcss()
  .use(cssstats())
  .process(css)
  .then(function (result) {
    result.messages.forEach(function (message) {
      console.log(message)
    })
  })
```

#### CLI

```sh
npm i -g cssstats
cssstats file path/to/file.css > results.json
```

You can also pipe CSS to cssstats:

```sh
cat some-css-file.css | cssstats
getcss google.com | cssstats
```

### Returned Object

```js
// Example
{
  size: n,
  gzipSize: n,
  rules: {
    total: n,
    size: {
      graph: [n],
      max: n,
      average: n
    }
  },
  selectors: {
    total: n,
    id: n,
    class: n,
    type: n,
    pseudoClass: n,
    psuedoElement: n,
    repeated: [str],
    values: [str],
    specificity: {
      graph: [n],
      max: n
      average: n
    }
  },
  declarations: {
    total: n,
    important: n,
    vendorPrefix: n,
    properties:
      prop: [str]
    },
    resets: {
      prop: n
    }
  },
  mediaQueries: {
    total: n,
    unique: n,
    values: [str]
  }
}
```

#### `size`
The size of the file in bytes

#### `gzipSize`
The size of the stylesheet gzipped in bytes

#### `rules` object

- `total` - total number of rules
- `size` object
  - `size.graph` - an array of ruleset sizes (number of declarations per rule) in source order
  - `size.max` - maximum ruleset size
  - `size.average` - average ruleset size

#### `selectors` object

- `total` - total number of selectors
- `id` - total number of id selectors
- `class` - total number of class selectors
- `type` - total number of type selectors
- `pseudoClass` - total number of pseudo class selectors
- `pseudoElement` - total number of pseudo element selectors
- `repeated` - array of strings of repeated selectors
- `values` - array of strings for all selectors
- `specificity` object
  - `specificity.graph` - array of numbers for each selector’s specificity as a base 10 number
  - `specificity.max` - maximum specificity as a base 10 number
  - `specificity.average` - average specificity as a base 10 number

#### `declarations` object

- `total` - total number of declarations
- `important` - total number of `!important` declarations
- `vendorPrefix` - total number of vendor prefixed declarations
- `properties` - object with each unique property and an array of that property’s values

#### `mediaQueries` object

- `total` - total number of media queries
- `unique` - total unique media queries
- `values` - array of values for each media query


See the `/test/results` folder for example JSON results.

MIT License

