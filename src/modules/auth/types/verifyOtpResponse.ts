export type VerifyOtpResponse = {
  refreshToken: string;
  accessToken: string;
  tokenId: string;
  user: {
    id: string;
    phoneNumber: string;
  };
};
