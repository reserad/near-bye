import { ActionType } from "../../actionType";
import { User } from "../types/user";
import { UserSetAction } from "../types/userSetAction";

export const setUser = (response: User): UserSetAction => ({
  type: ActionType.USER_SET,
  payload: response,
});
