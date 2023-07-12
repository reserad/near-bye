import { UserLoginAction } from "./userLoginAction";
import { UserSetAction } from "./userSetAction";
import { UserSignOutAction } from "./userSignOutAction";

export type UserAction = UserLoginAction | UserSignOutAction | UserSetAction;
