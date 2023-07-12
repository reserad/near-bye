import { ReduxAction } from "../..";
import { ActionType } from "../../actionType";
import { User } from "./user";

export interface UserSetAction extends ReduxAction<User> {
  type: ActionType.USER_SET;
}
