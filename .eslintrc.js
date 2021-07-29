module.exports = {
  root: true,
  extends: ['@react-native-community', 'eslint:recommended'],
  plugins: ['react', 'react-native', 'react-hooks'],
  rules: {
    'react-native/no-inline-styles': 0,
    'react-hooks/exhaustive-deps': 0,
    curly: 0,
    'no-shadow': 0,
  },
};
