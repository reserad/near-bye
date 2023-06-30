import { PostState } from "./post/postState";
import { UserState } from "./user/userState";

export interface RootState {
  user: UserState;
  posts: PostState;
}
