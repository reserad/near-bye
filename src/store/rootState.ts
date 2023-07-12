import { FeedState } from "./feed/feedState";
import { PostState } from "./post/postState";
import { UserState } from "./user/userState";

export interface RootState {
  user: UserState;
  userFeed: FeedState;
  post: PostState;
}
