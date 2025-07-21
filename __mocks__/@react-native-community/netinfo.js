   const mockNetInfo = {
     addEventListener: jest.fn(),
     fetch: jest.fn(() => Promise.resolve({ isConnected: true })),
   };

   export default mockNetInfo;

