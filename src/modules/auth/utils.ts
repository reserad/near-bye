import axios from "axios";
import { VerifyOtpResponse } from "./types/verifyOtpResponse";
import { VerifyOtpDto } from "./types/verifyOtpDto";
import { SendOtpDto } from "./types/sendOtpDto";
import * as Keychain from "react-native-keychain";
import DeviceInfo from "react-native-device-info";

const defaultRequestConfig = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000,
};

export const verifyOtp = async (
  data: VerifyOtpDto,
): Promise<VerifyOtpResponse> => {
  const response = await axios.request<VerifyOtpResponse>({
    ...defaultRequestConfig,
    method: "POST",
    url: `${process.env.REACT_APP_AUTH_SERVICE_URL}/verify`,
    data,
  });
  return response.data;
};

export const sendOtp = async (data: SendOtpDto): Promise<void> => {
  await axios.request({
    ...defaultRequestConfig,
    method: "POST",
    url: `${process.env.REACT_APP_AUTH_SERVICE_URL}/send`,
    data,
  });
};

export const getAuthHeaders = async () => {
  try {
    const result = await Keychain.getInternetCredentials(
      DeviceInfo.getBundleId(),
    );
    if (result) {
      const { accessToken }: VerifyOtpResponse = JSON.parse(result.password);
      return {
        authorization: `Bearer ${accessToken}`,
      };
    }
  } catch (err) {
    console.error(err);
    return {};
  }

  return {};
};
