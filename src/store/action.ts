import { FeedAction } from "./feed/types/feedAction";
import { PostAction } from "./post/types/postAction";
import { UserAction } from "./user/types/userAction";

export type RootAction = UserAction | FeedAction | PostAction;
