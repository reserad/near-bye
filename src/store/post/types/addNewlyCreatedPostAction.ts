import { ReduxAction } from "../..";
import { ActionType } from "../../actionType";
import { CreatedPost } from "./createdPost";

export interface AddNewlyCreatedPostAction extends ReduxAction<CreatedPost> {
  type: ActionType.ADD_USER_POST;
}
