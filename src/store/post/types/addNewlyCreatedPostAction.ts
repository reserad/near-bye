import { ReduxAction } from "../..";
import { ActionType } from "../../actionType";
import { Post } from "./post";

export interface AddNewlyCreatedPostAction extends ReduxAction<Post> {
  type: ActionType.ADD_USER_POST;
}
