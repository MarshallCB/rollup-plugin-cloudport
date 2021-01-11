[![npm](https://badgen.now.sh/npm/v/rollup-plugin-cloudport)](https://npmjs.org/package/rollup-plugin-cloudport)
[![install size](https://badgen.net/packagephobia/install/rollup-plugin-cloudport)](https://packagephobia.com/result?p=rollup-plugin-cloudport)

# rollup-plugin-cloudport

🍣  A Rollup plugin which converts NodeJS imports into URL's for browser-side modules. Based on [`skypin`](https://github.com/marshallcb/skypin) & [`unpkg-pin`](https://github.com/marshallcb/unpkg-pin).

## Install

Using npm:

```sh
npm install rollup-plugin-cloudport --save-dev
```
## Usage

Suppose an input file containing the snippet below exists at `src/index.js`, and attempts to load `hueman`:

**`src/index.js` (input file)**
```js
// src/index.js
import { hueman } from 'hueman';

console.log(hueman(100,1.0,0.5));
```

Create a `rollup.config.js` [configuration file](https://www.rollupjs.org/guide/en/#configuration-files) and import the plugin:

**`rollup.config.js` (input file)**
```js
import { skypin, unpkg } from 'rollup-plugin-cloudport';

export default [{
  input: 'src/index.js',
  output: {
    file: 'dist/index.skypack.js',
    format: 'esm'
  },
  // ...
  plugins: [
    skypin()
  ]
},{
  input: 'src/index.js',
  output: {
    file: 'dist/index.unpkg.js',
    format: 'esm'
  },
  // ...
  plugins: [
    unpkg()
  ]
}];
```

Then call `rollup` either via the [CLI](https://www.rollupjs.org/guide/en/#command-line-reference) or the [API](https://www.rollupjs.org/guide/en/#javascript-api).

**`dist/index.js` (example output file)**
```js
import { hueman } from 'https://cdn.skypack.dev/pin/hueman@v2.1.1-ElNqhC8YFxLlgRtjjL9o/min/hueman.js';

console.log(hueman(100,1.0,0.5))
```

## Options

The options object can be used to customize the behavior of this plugin
- `options.shouldReplace()`: `function(id) => boolean` (default to `()=>true`). Customize which module ID's to replace using skypin. 
- `options.relative_external`: `boolean` (defaults to `false`). Whether to return relative exports (ex: `./supporting_file.js`) as `external`
- `options.web_external`: `boolean` (defaults to `true`). Whether to mark existing web imports (starting with "https://" or "http://") as `external` to be ignored.

## License

MIT © [Marshall Brandt](https://m4r.sh)
