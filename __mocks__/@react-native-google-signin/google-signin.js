   export const GoogleSignin = {
     configure: jest.fn(),
     signIn: jest.fn(() => Promise.resolve({})),
     signOut: jest.fn(() => Promise.resolve()),
     isSignedIn: jest.fn(() => Promise.resolve(false)),
     getCurrentUser: jest.fn(() => Promise.resolve(null)),
     hasPlayServices: jest.fn(() => Promise.resolve(true)),
   };

   export const statusCodes = {
     SIGN_IN_CANCELLED: 'SIGN_IN_CANCELLED',
     IN_PROGRESS: 'IN_PROGRESS',
     PLAY_SERVICES_NOT_AVAILABLE: 'PLAY_SERVICES_NOT_AVAILABLE',
   };

