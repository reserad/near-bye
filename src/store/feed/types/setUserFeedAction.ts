import { ReduxAction } from "../..";
import { Post } from "../../../modules/posts/types/post";
import { ActionType } from "../../actionType";

export interface SetUserFeedAction extends ReduxAction<Post[]> {
  type: ActionType.SET_USER_FEED;
}
