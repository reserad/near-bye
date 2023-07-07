import { FeedState } from "./feed/feedState";
import { UserState } from "./user/userState";

export interface RootState {
  user: UserState;
  userFeed: FeedState;
}
