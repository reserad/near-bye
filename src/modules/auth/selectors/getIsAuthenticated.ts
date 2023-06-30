import { RootState } from "../../../store/rootState";

export const getIsAuthenticated = (state: RootState) => {
  return state.user.isAuthenticated;
};
