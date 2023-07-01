import { ActionType } from "../../actionType";
import { UserSignOutAction } from "../types/userSignOutAction";

export const signOutUser = (): UserSignOutAction => ({
  type: ActionType.USER_SIGN_OUT,
});
