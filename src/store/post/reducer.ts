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
      return {
        ...state,
        feed: action.payload,
      };
    case ActionType.ADD_USER_POST:
      return {
        ...state,
        feed: [action.payload].concat(state.feed),
      };
    default:
      return state;
  }
};
