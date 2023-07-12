import { SetUserFeedAction } from "../types/setUserFeedAction";
import { ActionType } from "../../actionType";
import { Post } from "../../../modules/posts/types/post";

export const setFeed = (response: Post[]): SetUserFeedAction => ({
  type: ActionType.SET_USER_FEED,
  payload: response,
});
