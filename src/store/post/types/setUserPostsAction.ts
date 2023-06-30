import { ReduxAction } from "../..";
import { Post } from "../../../modules/feed/types/post";
import { ActionType } from "../../actionType";

export interface SetUserPostsAction extends ReduxAction<Post[]> {
  type: ActionType.SET_USER_POSTS;
}
