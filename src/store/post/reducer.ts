import { RootAction } from "../action";
import { ActionType } from "../actionType";
import { PostState } from "./postState";

const initialState: PostState = {
  feed: [],
};

export const PostReducer = (
  state: PostState = initialState,
  action: RootAction,
): PostState => {
  switch (action.type) {
    case ActionType.SET_USER_POSTS:
      const payload = action.payload;
      return {
        ...state,
        feed: payload,
      };
    default:
      return state;
  }
};
