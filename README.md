# fx(stdio) – the generative artist's studio

fx(stdio) is a webpack plugin that adds a UI for viewing and controlling
the hash and other variables for your fx(hash) projects.

![stdio overview](static/stdio-overview.png)

## Installation

Clone the repo:

```bash
git clone git@github.com:alt-escapism/stdio.git
```

Add to your fx(hash) project:

```bash
npm install {PATH_TO_CLONED_REPO}
# E.g. npm install ~/src/stdio
```

Add the plugin to your webpack config, and instruct the dev server to open at
the `/stdio` URL path. If you're using the [fxhash webpack boilerplate](https://github.com/fxhash/fxhash-webpack-boilerplate), it would look like this:

```js
// In webpack.config.dev.js
const config = require("./webpack.config");
const StdioWebpackPlugin = require("stdio/webpack-plugin");

module.exports = {
  ...config,
  mode: "development",
  devServer: {
    // ...other options...
    open: "/stdio",
    // ...other options...
  },
  plugins: [
    ...config.plugins,
    // Add the plugin
    new StdioWebpackPlugin(),
  ],
};
```

Restart your webpack dev server.

## Usage

fx(stdio) is available at the `/stdio` URL path. To view your project without
the fx(stdio) UI, simply open the root (`/`) path instead.

The hash is automatically detected. To control other variables from fx(stdio),
import and use the random functions from `stdio` instead of `fxrand()` or p5js'
`random()`.

Each of the random functions from `stdio` expect a unique `name` as their first
argument. This name will be shown in the UI, as well as used to persist values
between reloads should you choose to lock them.

### random()

Generates a random number.

```ts
function random(
  name: string,
  min: number = 0,
  max: number = 1,
  transform?: (x: number) => number
): number;
```

Examples:

```ts
import { random } from "stdio";

// random number between 0 and 1 (exclusive)
const chance = random("chance");

// random integer between 0 and 100 (exclusive)
const width = random("width", 0, 100, Math.floor);
```

### choose()

Choose a random option out of an array or object.

```ts
function choose<T>(name: string, choices: T[] | { [key: string]: T }): T;
```

Examples:

```ts
import { choose } from "stdio";

// random choice out of "circle", "square", or "diamond"
const shape = choose("shape", ["circle", "square", "diamond"]);

// non-primitive choices (objects or functions) should use the object form
const shapeFn = choose("shapeFn", {
  circle: () => drawCircle(),
  square: () => drawSquare(),
  diamond: () => drawSquare({ rotateDegrees: 45 }),
});

// object form can also be used if you simply want to give names to the choices
const distance = choose("distance", {
  near: 10,
  far: 20,
  veryFar: 60,
});
```

Different weights can be applied so that choices are not equally likely:

```ts
import { choose, weight } from "stdio";

// 50% chance of getting "circle",
// 30% chance of getting "square", and
// 20% chance of getting "diamond"
const shape = choose("shape", [
  weight(50, "circle"),
  weight(30, "square"),
  weight(20, "diamond"),
]);

// If unspecified, the default weight is 1;
// in the below scenario, "circle" is twice as likely as "square"
const shapeFn = choose("shapeFn", {
  circle: weight(2, () => drawCircle()),
  square: () => drawSquare(),
});
```

## Advanced

### Variable grouping

If you have a lot of variables and would like to create groupings in the UI,
you can prefix a variable name with a common group name(s), separated by a `/`
(think of it like a directory structure).

```ts
const rotation = random("camera/rotation", 0, 360);
const distance = choose("camera/distance", {
  near: 10,
  far: 20,
  veryFar: 60,
});
```

The above would be displayed like this:

![grouping example](static/grouping-example.png)
