import { ReduxAction } from "../..";
import { ActionType } from "../../actionType";
import { Post } from "./post";

export interface SetUserPostsAction extends ReduxAction<Post[]> {
  type: ActionType.SET_USER_POSTS;
}
