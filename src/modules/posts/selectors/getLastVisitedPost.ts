import { RootState } from "../../../store/rootState";

export const getLastVisitedPost = (state: RootState) => {
  return state.post.lastVisitedPost;
};
