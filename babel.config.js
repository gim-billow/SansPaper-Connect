module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.json'],
        alias: {
          tests: ['./tests/'],
          '@components': './src/components',
          '@containers': './src/containers',
          '@constant': './src/constant',
          '@assets': './src/assets',
          '@api': './src/api',
          '@database': './src/database',
          '@navigation': './src/navigation',
          '@util': './src/util',
          '@styles': './src/styles',
          '@store': './src/store',
          '@selector': './src/selector',
        },
      },
    ],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
