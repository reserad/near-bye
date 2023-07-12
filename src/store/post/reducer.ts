import { RootAction } from "../action";
import { ActionType } from "../actionType";
import { PostState } from "./postState";

const initialState: PostState = {
  lastVisitedPost: null,
};

export const PostReducer = (
  state: PostState = initialState,
  action: RootAction,
): PostState => {
  switch (action.type) {
    case ActionType.SET_POST:
      return {
        ...state,
        lastVisitedPost: action.payload,
      };
    default:
      return state;
  }
};
