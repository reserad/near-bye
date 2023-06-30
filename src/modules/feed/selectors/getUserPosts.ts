import { RootState } from "../../../store/rootState";

export const getUserPosts = (state: RootState) => {
  return state.posts.feed;
};
