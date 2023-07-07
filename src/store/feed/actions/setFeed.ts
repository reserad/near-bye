import { SetUserFeedAction } from "../types/setUserFeedAction";
import { ActionType } from "../../actionType";
import { FeedItem } from "../types/feed";

export const setFeed = (response: FeedItem[]): SetUserFeedAction => ({
  type: ActionType.SET_USER_FEED,
  payload: response,
});
