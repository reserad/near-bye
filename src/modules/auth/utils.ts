import { VerifyOtpResponse } from "./types/verifyOtpResponse";
import * as Keychain from "react-native-keychain";
import DeviceInfo from "react-native-device-info";

export const getAuthToken = async () => {
  try {
    const result = await Keychain.getInternetCredentials(
      DeviceInfo.getBundleId(),
    );
    if (result) {
      const { accessToken }: VerifyOtpResponse = JSON.parse(result.password);
      return accessToken;
    }
  } catch (err) {
    console.error(err);
    return null;
  }

  return null;
};
