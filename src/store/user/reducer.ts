import { RootAction } from "../action";
import { UserState } from "./userState";

const initialState: UserState = {
  id: undefined,
};

export const UserReducer = (
  state: UserState = initialState,
  action: RootAction,
) => {
  switch (action) {
    default:
      return state;
  }
};
