module.exports = {
  entry: './source/index.js',
  output: {
    library: 'honestWorkers',
    libraryTarget: 'umd',
    path: 'dist',
    filename: 'honest-workers.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader'
        }]
      }
    ]
  },
  watchOptions: {
    poll: true
  }
};
