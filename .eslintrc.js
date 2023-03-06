module.exports = {
  root: true,
  extends: "@react-native-community",
  plugins: ["import"],
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        alias: {
          "@navigation": "./src/navigation",
          "@components": "./src/components",
          "@assets": "./assets",
          "@api": "./src/api",
          "@model": "./src/model",
          "@common": "./src/common",
          "@redux": "./src/redux",
          "@screens": "./src/screens",
          "@theme": "./src/theme",
          "@images": "./src/assets/images",
          "@localize": "./src/localize",
          "@SVGs": "./src/assets/SVGs",
          "@interfaces": "./src/interfaces",
        },
      },
    },
  },
};
