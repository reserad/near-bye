export type UserState = {
  id: string;
  phoneNumber: string;
  profileImage: string;
  name: string;
  baseLatitude: number;
  baseLongitude: number;
  auth: {
    accessToken: string;
    refreshToken: string;
    tokenId: string;
  };
  isAuthenticated: boolean;
};
