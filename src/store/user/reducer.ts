import { RootAction } from "../action";
import { ActionType } from "../actionType";
import { UserState } from "./userState";

const initialState: UserState = {
  id: undefined,
  auth: {
    accessToken: "",
    refreshToken: "",
    tokenId: "",
  },
  phoneNumber: "",
  profileImage: "",
  name: "",
  baseLatitude: null,
  baseLongitude: null,
  isAuthenticated: false,
};

export const UserReducer = (
  state: UserState = initialState,
  action: RootAction,
): UserState => {
  switch (action.type) {
    case ActionType.USER_LOGIN:
      const { accessToken, refreshToken, tokenId, user } = action.payload;
      return {
        ...state,
        auth: {
          accessToken: accessToken,
          refreshToken: refreshToken,
          tokenId: tokenId,
        },
        id: user.id,
        phoneNumber: user.phoneNumber,
        isAuthenticated: true,
      };
    case ActionType.USER_SIGN_OUT:
      return {
        ...initialState,
      };
    case ActionType.USER_SET:
      const fetchedUser = action.payload;
      return {
        ...state,
        profileImage: fetchedUser.profileImage,
        name: fetchedUser.name,
        baseLatitude: fetchedUser.baseLatitude,
        baseLongitude: fetchedUser.baseLongitude,
      };
    default:
      return state;
  }
};
