 module.exports = {
   preset: 'react-native',
   setupFiles: ["<rootDir>/jest.setup.js"],
   transformIgnorePatterns: [
       'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-vector-icons|react-native-image-picker|@react-native-google-signin/google-signin|@react-native-community/netinfo|react-native-orientation-locker)/)',
   ],
   moduleNameMapper: {
       '\\.(jpg|jpeg|png|gif|webp|svg)$': 'jest-transform-stub',
       '\\.scss$': 'jest-css-modules',
       '@react-native-async-storage/async-storage': '<rootDir>/__mocks__/@react-native-async-storage/async-storage.js',
       '@react-native-google-signin/google-signin': '<rootDir>/__mocks__/@react-native-google-signin/google-signin.js',
       '@react-native-community/netinfo': '<rootDir>/__mocks__/@react-native-community/netinfo.js',
       'react-native-orientation-locker': '<rootDir>/__mocks__/react-native-orientation-locker.js',
   },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
 };

