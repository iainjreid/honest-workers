# Honest Workers
Promise based WebWorkers, for much multi-threaded goodness

[![npm](https://img.shields.io/npm/v/honest-workers.svg?style=flat-square)](https://www.npmjs.com/package/honest-workers) [![Bower](https://img.shields.io/bower/v/honest-workers.svg?style=flat-square)](https://github.com/iainreid820/honest-workers)
![travis](https://img.shields.io/travis/iainreid820/honest-workers/master.svg?style=flat-square)

## Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Installation
This library is available for installation via both NPM and Bower, simply type one of the following, depending on your package manager, into your terminal to install the latest version:

```bash
# Install the module from NPM
npm i honest-workers -S

# Or from the Bower registry
bower i honsest-workers -S
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
This project is licensed under the MIT license.
