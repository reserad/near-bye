import { RootState } from "../../../store/rootState";

export const getCurrentUser = (state: RootState) => {
  return state.user;
};
