import { RootState } from "../../../store/rootState";

export const getUserFeed = (state: RootState) => {
  return state.userFeed.feed;
};
