// export default from '@react-native-async-storage/async-storage/jest/async-storage-mock';

export default {
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
};
