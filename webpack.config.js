import path from 'path';

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
