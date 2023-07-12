export type UserState = {
  id: string;
  phoneNumber: string;
  profileImage: string;
  auth: {
    accessToken: string;
    refreshToken: string;
    tokenId: string;
  };
  isAuthenticated: boolean;
};
