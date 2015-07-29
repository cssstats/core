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

#### Options

Options may be passed as a second argument.

```js
var stats = cssstats(css, { mediaQueries: false })
```

- `safe` (boolean, default: `true`) - enables PostCSS safe mode for parsing CSS with syntax errors
- `lite` (boolean, default `false`) - returns a smaller object for performance concerns
- `mediaQueries` (boolean, default `true`) - determines whether or not to generate stats for each media query block

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
    values: [str],
    specificity: {
      max: n
      average: n
    },
    getSpecificityGraph(),
    getRepeatedValues(),
    getSortedSpecificity()
  },
  declarations: {
    total: n,
    important: n,
    vendorPrefix: n,
    properties:
      prop: [str]
    },
    getPropertyResets(),
    getUniquePropertyCount(),
    getPropertyValueCount()
  },
  mediaQueries: {
    total: n,
    unique: n,
    values: [str],
    contents: [
      {
        value: str,
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
          pseudoElement: n,
          values: [str],
          specificity: {
            max: n,
            average: n
          }
        },
        declarations: {
          total: n,
          important: n,
          vendorPrefix: n,
          properties: {
            prop: [str]
          }
        }
      }
    ]
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
- `values` - array of strings for all selectors
- `specificity` object
  - `specificity.max` - maximum specificity as a base 10 number
  - `specificity.average` - average specificity as a base 10 number
- `getSpecificityGraph()` - method that returns an array of numbers for each selector’s specificity as a base 10 number
- `getRepeatedValues()` - method that returns an array of strings of repeated selectors
- `getSortedSpecificity()` - method that returns an array of selectors with base 10 specificity score, sorted from highest to lowest

#### `declarations` object

- `total` - total number of declarations
- `important` - total number of `!important` declarations
- `vendorPrefix` - total number of vendor prefixed declarations
- `properties` - object with each unique property and an array of that property’s values
- `getPropertyResets()` - method that returns an object with the number of times margin or padding is reset for each property
- `getUniquePropertyCount(property)` - method that returns the number of unique values for the given property
- `getPropertyValueCount(property, value)` - method that returns the number of times a declaration occurs for the given property and value

#### `mediaQueries` object

- `total` - total number of media queries
- `unique` - total unique media queries
- `values` - array of values for each media query
- `contents` - array of media query blocks with stats for each


See the `/test/results` folder for example JSON results.

### Usage examples

#### Get total number of unique colors

```js
var cssstats = require('cssstats')
var stats = cssstats(css)
var uniqueColorsCount = stats.declarations.getUniquePropertyCount('color')
```

#### `display: none` count

```js
var displayNoneCount = stats.declarations.getPropertyValueCount('display', 'none')
```

#### Sort selectors by highest specificity

```js
var sortedSelectors = stats.selectors.getSortedSpecificity()
```


MIT License

