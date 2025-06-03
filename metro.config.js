const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);
  const { resolver: { sourceExts } } = defaultConfig;

  const config = {
    transformer: {
      babelTransformerPath: require.resolve('react-native-sass-transformer')
    },
    resolver: {
      sourceExts: [...sourceExts, 'scss', 'sass']
    }
  };

  return mergeConfig(defaultConfig, config);
})();


// const { getDefaultConfig } = require('metro-config');
//
// module.exports = (async () => {
//   const defaultConfig = await getDefaultConfig(__dirname);
//
//   return {
//     transformer: {
//       babelTransformerPath: require.resolve('react-native-sass-transformer'),
//     },
//     resolver: {
//       assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'scss'),
//       sourceExts: [...defaultConfig.resolver.sourceExts, 'scss', 'sass'],
//     },
//   };
// })();

