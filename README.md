# CSS Statistics
Parses stylesheets and returns an object with statistics

Used in http://cssstats.com

## Usage

```js
var fs = require('fs');
var cssstats = require('css-statistics');

var css = fs.readFileSync('./styles.css', 'utf8');
var obj = cssstats(css);
```

### Returned Object

#### `size`
The size of the file in bytes

#### `selectors`
An array of selectors sorted by source order with the selector string, specificity score, and parts array

#### `declarations`
An object of declarations.

##### `declarations.all`
An array of declaration objects from the `reworkcss/css` AST object. This array serves as the reference point for other parts of the `declarations` object.

##### `declarations.byProperty`
An object with keys for each property found in the stylesheet.

##### `declarations.byProperty[key]`
An array of indexes for declarations with the property _key_. Use the index to find the full declaration in `declarations.all`.

##### `declarations.unique[key]`
Similar to `declarations.byProperty`, but only lists the first unique value for each property.

##### `declarations.byMedia[key]`
Similar to `declarations.byProperty`, but only lists declarations in the `@media` rule _key_.

#### `rules`
Flattened array of rules from the `reworkcss/css` AST object.

#### `aggregates`
Aggregate data for the entire stylesheet.

- `selectors` - total number of selectors
- `declarations` - total number of declarations
- `properties` - an array of properties used in the stylesheet
- `mediaQueries` - an array of media query strings used in the stylesheet

- `fontSizes.total` - total number of font-size declarations
- `fontSizes.unique` - number of unique font-size declarations
- `floats.total` - total number of float declarations
- `floats.unique` - number of unique float declarations
- `widths.total` - total number of width declarations
- `widths.unique` - number of unique width declarations
- `heights.total` - total number of height declarations
- `heights.unique` - number of unique height declarations
- `colors.total` - total number of color declarations
- `colors.unique` - number of unique color declarations
- `backgroundColors.total` - total number of background-color declarations
- `backgroundColors.unique` - number of unique background-color declarations

### Truncated Sample Object

```json
{
  "size": 18860,
  "selectors": [
    {
      "selector": "body",
      "specificity": "0,0,0,1",
      "parts": [
        {
          "selector": "body",
          "type": "c",
          "index": 0,
          "length": 4
        }
      ]
    }
  ],
  "declarations": {
    "all": [
      {
        "type": "declaration",
        "property": "margin",
        "value": "0",
        "position": {
          "start": {
            "line": 18,
            "column": 3
          },
          "end": {
            "line": 18,
            "column": 12
          }
        }
      }
    ],
    "byProperty": {
      "margin": [
        0,
        68,
        108,
        113
      ],
      "fontFamily": [
        1,
        5,
        8,
        17
      ]
    },
    "unique": {
      "margin": [
        0,
        113,
        118,
        123
      ]
    },
    "byMedia": {
      "(minWidth:40em)": [
        164,
        167,
        230,
        231
      ]
    }
  },
  "rules": [
    {
      "type": "rule",
      "selectors": [
        "body",
        "button"
      ],
      "declarations": [
        {
          "type": "declaration",
          "property": "margin",
          "value": "0",
          "position": {
            "start": {
              "line": 18,
              "column": 3
            },
            "end": {
              "line": 18,
              "column": 12
            }
          }
        }
      ],
      "position": {
        "start": {
          "line": 16,
          "column": 1
        },
        "end": {
          "line": 19,
          "column": 2
        }
      }
    },
  ],
  "aggregates": {
    "selectors": 347,
    "declarations": 471,
    "properties": [
      "margin",
      "fontFamily",
      "fontSize",
      "maxWidth"
    ],
    "mediaQueries": [
      "(minWidth:40em)",
      "(minWidth:52em)",
      "(minWidth:64em)"
    ],
    "fontSizes": {
      "total": 11,
      "unique": 8
    },
    "floats": {
      "total": 10,
      "unique": 2
    },
    "widths": {
      "total": 56,
      "unique": 13
    },
    "heights": {
      "total": 4,
      "unique": 3
    },
    "colors": {
      "total": 25,
      "unique": 10
    },
    "backgroundColors": {
      "total": 31,
      "unique": 15
    }
  }
}
```

