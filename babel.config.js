const path = require('path');

   module.exports = {
     presets: ['module:@react-native/babel-preset'],
     plugins: [
       [
         'module-resolver',
         {
           extensions: ['.js', '.jsx', '.ts', '.tsx'],
           alias: {
             // Alias for Components
             'Components': path.resolve(__dirname, 'src/Components'),
             'ButtonStyles': path.resolve(__dirname, 'src/Components/Buttons/styles'),
             'FooterStyles': path.resolve(__dirname, 'src/Components/Footer/styles'),
             'InputStyles': path.resolve(__dirname, 'src/Components/Inputs/styles'),
             'LogoStyles': path.resolve(__dirname, 'src/Components/Logo/styles'),
             'ModalStyles': path.resolve(__dirname, 'src/Components/Modals/styles'),
             'TitleStyles': path.resolve(__dirname, 'src/Components/Titles/styles'),

             // Alias for Pages
             'Pages': path.resolve(__dirname, 'src/Pages'),
             'LoginStyles': path.resolve(__dirname, 'src/Pages/Login/styles'),

             // Alias for redux
             'redux/actions': path.resolve(__dirname, 'src/redux/actions.js'),
             'redux/store': path.resolve(__dirname, 'src/redux/store.js'),
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
