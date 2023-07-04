import { RootState } from "../../../store/rootState";

export const getCurrentSignedInUser = (state: RootState) => {
  return state.user.id;
};
