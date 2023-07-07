import { ReduxAction } from "../..";
import { ActionType } from "../../actionType";
import { FeedItem } from "./feed";

export interface SetUserFeedAction extends ReduxAction<FeedItem[]> {
  type: ActionType.SET_USER_FEED;
}
