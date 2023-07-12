import { ReduxAction } from "../..";
import { Post } from "../../../modules/posts/types/post";
import { ActionType } from "../../actionType";

export interface SetPostAction extends ReduxAction<Post> {
  type: ActionType.SET_POST;
}
