// Learn more https://docs.expo.io/guides/customizing-metro
const { configs } = require('@typescript-eslint/eslint-plugin');
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});
config.transformer.babelTransformerPath =  require.resolve('react-native-react-bridge/lib/plugin')

module.exports = config;
