import DeviceInfo from "react-native-device-info";
import { VerifyOtpResponse } from "../../../modules/auth/types/verifyOtpResponse";
import { NewThunkAction } from "../../newThunkAction";
import * as Keychain from "react-native-keychain";
import { loginUser } from "./loginUser";

export const login =
  (response: VerifyOtpResponse): NewThunkAction<void> =>
  async (dispatch, getState) => {
    const json = JSON.stringify(response);
    console.info("Setting keychain started");
    await Keychain.setInternetCredentials(
      DeviceInfo.getBundleId(),
      "NearBye",
      json,
    );
    console.info("Setting keychain complete");
    dispatch(loginUser(response));
  };
