import { PostAction } from "./post/types/postAction";
import { UserAction } from "./user/types/userAction";

export type RootAction = UserAction | PostAction;
