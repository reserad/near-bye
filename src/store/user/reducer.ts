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
  isAuthenticated: false,
};

export const UserReducer = (
  state: UserState = initialState,
  action: RootAction,
): UserState => {
  switch (action.type) {
    case ActionType.USER_LOGIN:
      const payload = action.payload;
      return {
        ...state,
        auth: {
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken,
          tokenId: payload.tokenId,
        },
        id: payload.user.id,
        phoneNumber: payload.user.phoneNumber,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};
