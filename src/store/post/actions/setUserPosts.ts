import { SetUserPostsAction } from "../types/setUserPostsAction";
import { ActionType } from "../../actionType";
import { Post } from "../types/post";

export const setUserPosts = (response: Post[]): SetUserPostsAction => ({
  type: ActionType.SET_USER_POSTS,
  payload: response,
});
