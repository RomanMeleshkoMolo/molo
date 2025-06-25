const path = require('path');

   module.exports = {
     presets: ['module:@react-native/babel-preset'],
     plugins: [
       [
         'module-resolver',
         {
           extensions: ['.js', '.jsx', '.ts', '.tsx'],
           alias: {
             'Components': path.resolve(__dirname, 'src/Components'),
           },
         },
       ],
       [
           'module:react-native-dotenv',
         {
           moduleName: '@env',
           path: path.resolve(__dirname, '.env'),
         }
       ],
     ],
   };
