import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../rootState";
import { RootAction } from "../action";

export const useNewDispatch = (): ThunkDispatch<RootState, null, RootAction> =>
  useDispatch();
