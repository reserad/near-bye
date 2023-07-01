import DeviceInfo from "react-native-device-info";
import { NewThunkAction } from "../../newThunkAction";
import * as Keychain from "react-native-keychain";
import { signOutUser } from "./signOutUser";

export const signOut =
  (): NewThunkAction<void> => async (dispatch, _getState) => {
    console.info("Clearing keychain started");
    await Keychain.resetInternetCredentials(DeviceInfo.getBundleId());
    console.info("Clearing keychain completed");
    dispatch(signOutUser());
  };
