export type UserState = {
  id: string;
  phoneNumber: string;
  auth: {
    accessToken: string;
    refreshToken: string;
    tokenId: string;
  };
  isAuthenticated: boolean;
};
