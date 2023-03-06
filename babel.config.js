module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@navigation': './src/navigation',
          '@components': './src/components',
          '@assets': './assets',
          '@api': './src/api',
          '@model': './src/model',
          '@common': './src/common',
          '@redux': './src/redux',
          '@screens': './src/screens',
          '@theme': './src/theme',
          '@images': './src/assets/images',
          '@localize': './src/localize',
          '@SVGs': './src/assets/SVGs',
          '@interfaces': './src/interfaces',
        },
      },
    ],
  ],
};
