module.exports = {
  entry: './source/index.js',
  output: {
    library: 'honestWorkers',
    libraryTarget: 'umd',
    path: 'dist',
    filename: 'honest-workers.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  watchOptions: {
    poll: true
  }
};
