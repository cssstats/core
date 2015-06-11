# CSS Statistics
Parses stylesheets and returns an object with statistics

Used in http://cssstats.com

## Installation

```sh
npm install --save cssstats
```

## Usage

```js
var fs = require('fs');
var cssstats = require('csstats');

var css = fs.readFileSync('./styles.css', 'utf8');
var obj = cssstats(css);
```

Instead of a CSS string, you can also pass the [PostCSS AST](https://github.com/postcss/postcss):

```js
var fs = require('fs');
var postcss = require('postcss');
var cssstats = require('csstats');

var css = fs.readFileSync('./styles.css', 'utf8');
var ast = postcss.parse(css);
var obj = cssstats(ast);
```

### Using the CLI

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

__`size`:__ The size of the file in bytes

__`gzipSize`:__ The size of the stylesheet gzipped in bytes

__`selectors`:__ An array of selectors sorted by source order with the selector string, specificity score, and parts array

__`declarations`:__ An object of declarations.
- `declarations.all`: An array of declaration objects from PostCSS.
- `declarations.byProperty`: An object with keys for each property found in the stylesheet.
- `declarations.unique`: An object with keys for each unique property/value found in the stylesheet.
- `declarations.byMedia`: An object with keys for each media query found in the stylesheet.
- `declarations.propertyResetDeclarations`: An object with keys for each property with a value of `0` found in the stylesheet. (Actually only margins and paddings are counted)
- `declarations.importantCount`: The number of declarations with values that contain `!important`
- `declarations.vendorPrefixCount`: The number of declaration properties that have vendor prefixes.
- `declarations.displayNoneCount`: The number of `display: none;` declarations.
- `declarations.uniqueDeclarationsCount`: The number of unique declarations.

__`rules`:__ Flattened array of rules from PostCSS.

__`aggregates`:__ Aggregate data for the entire stylesheet.
- `selectors` - total number of selectors
- `declarations` - total number of declarations
- `properties` - an array of properties used in the stylesheet
- `mediaQueries` - an array of media query strings used in the stylesheet
- `idSelectors` - total number of selectors containing an id
- `classSelectors` - total number of selectors containing a class
- `pseudoElementSelectors` - total number of selectors containing an pseudo element
- `pseudoClassSelectors` - total number of selectors containing a pseudo class
- `repeatedSelectors` - array of selectors that were declared more than once

For every unique property found in the stylesheet, `aggregates` also includes these values:
- `[property].total` - total number of [property] declarations
- `[property].unique` - number of unique [property] declarations


See the `/test/results` folder for example JSON results.
