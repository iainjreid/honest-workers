# Honest Workers
Promise based WebWorkers, for much multi-threaded goodness

[![npm](https://img.shields.io/npm/v/honest-workers.svg?style=flat-square)](https://www.npmjs.com/package/honest-workers)

## Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Installation
This library is available for installation via NPM, simply type the following into your terminal to install the latest version:

```bash
npm install honest-workers --save
```

## Usage
Include this library in your application via either your choosen bundling tool, or via a script tag in the head of your website. This library will currently work out-of-the-box with all known bundlers and or transpilers.

A brief example in ES5 for Browserify or Webpack users would go as follows. This snippet will simply log "Hello!" to the console.

```javascript
var honestWorkers = require('honest-workers');

honestWorkers.register('myEchoTask', function (msg, done) {
    done(msg);
});

honestWorkers.execute('myEchoTask', 'Hello!').then(function (echo) {
    console.log(echo);
});
```

For more detailed usage, please follow [this link](https://iainreid820.github.io/honest-workers/), where you can find the documentation generated directly from the source code.

## License
This project is licensed under the GNU license, please see [the license](http://www.gnu.org/licenses/gpl-3.0.txt) for more information.
