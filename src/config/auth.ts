import storage from './storage';

const auth = {
  redirectTo: '/',
  loginPage: '/login',
  session: {
    keys: {
      accessToken: storage.prefix + 'AccessToken',
      tokenType: storage.prefix + 'TokenType',
      expiresAt: storage.prefix + 'ExpiresAt',
      refreshToken: storage.prefix + 'RefreshToken',
    },
  },
};

export default auth;
