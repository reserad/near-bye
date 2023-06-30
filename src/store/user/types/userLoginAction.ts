import { ReduxAction } from "../..";
import { VerifyOtpResponse } from "../../../modules/auth/types/verifyOtpResponse";
import { ActionType } from "../../actionType";

export interface UserLoginAction extends ReduxAction<VerifyOtpResponse> {
  type: ActionType.USER_LOGIN;
}
