import { SetPostAction } from "../types/setPostAction";
import { ActionType } from "../../actionType";
import { Post } from "../../../modules/posts/types/post";

export const setPost = (payload: Post): SetPostAction => ({
  type: ActionType.SET_POST,
  payload,
});
