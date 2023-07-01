import { UserLoginAction } from "./userLoginAction";
import { UserSignOutAction } from "./userSignOutAction";

export type UserAction = UserLoginAction | UserSignOutAction;
