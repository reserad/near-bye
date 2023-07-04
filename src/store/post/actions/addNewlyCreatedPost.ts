import { ActionType } from "../../actionType";
import { Post } from "../types/post";
import { AddNewlyCreatedPostAction } from "../types/addNewlyCreatedPostAction";

export const addNewlyCreatedPost = (
  response: Post,
): AddNewlyCreatedPostAction => ({
  type: ActionType.ADD_USER_POST,
  payload: response,
});
