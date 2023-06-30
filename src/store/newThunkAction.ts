import { ThunkAction } from "redux-thunk";
import { RootAction } from "./action";
import { RootState } from "./rootState";

export type NewThunkAction<T> = ThunkAction<T, RootState, null, RootAction>;
