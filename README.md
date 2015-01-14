# CSS Statistics
Parses stylesheets and returns an object with statistics

Used in http://cssstats.com

## Installation

```sh
npm install cssstats
```

## Usage

```js
var fs = require('fs');
var cssstats = require('csstats');

var css = fs.readFileSync('./styles.css', 'utf8');
var obj = cssstats(css);
```

### Returned Object

#### `size`
The size of the file in bytes

#### `gzipSize`
The size of the stylesheet gzipped in bytes

#### `selectors`
An array of selectors sorted by source order with the selector string, specificity score, and parts array

#### `declarations`
An object of declarations.

##### `declarations.all`
An array of declaration objects from PostCSS.

##### `declarations.byProperty`
An object with keys for each property found in the stylesheet.

##### `declarations.unique`
An object with keys for each unique property/value found in the stylesheet.

##### `declarations.byMedia`
An object with keys for each media query found in the stylesheet.

#### `rules`
Flattened array of rules from PostCSS.

#### `aggregates`
Aggregate data for the entire stylesheet.

- `selectors` - total number of selectors
- `declarations` - total number of declarations
- `properties` - an array of properties used in the stylesheet
- `mediaQueries` - an array of media query strings used in the stylesheet

For every unique property found in the stylesheet, `aggregates` also includes these values:
- `[property].total` - total number of [property] declarations
- `[property].unique` - number of unique [property] declarations


See the `/test` folder for example JSON results.

### Using the CLI

```
npm i -g cssstats
```

With a file:

```bash
cssstats file ./path/to/file.css
```

With a url:

```
cssstats url http://basscss.com
```
