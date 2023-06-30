import { VerifyOtpResponse } from "../../../modules/auth/types/verifyOtpResponse";
import { UserLoginAction } from "../types/userLoginAction";
import { ActionType } from "../../actionType";

export const loginUser = (response: VerifyOtpResponse): UserLoginAction => ({
  type: ActionType.USER_LOGIN,
  payload: response,
});
