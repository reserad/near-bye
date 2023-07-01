import { ReduxAction } from "../..";
import { ActionType } from "../../actionType";

export interface UserSignOutAction extends ReduxAction<void> {
  type: ActionType.USER_SIGN_OUT;
}
