import { ActionType } from "../../actionType";
import { CreatedPost } from "../types/createdPost";
import { AddNewlyCreatedPostAction } from "../types/addNewlyCreatedPostAction";

export const addNewlyCreatedPost = (
  response: CreatedPost,
): AddNewlyCreatedPostAction => ({
  type: ActionType.ADD_USER_POST,
  payload: response,
});
