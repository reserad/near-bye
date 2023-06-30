import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../rootState";

export const useNewSelector: TypedUseSelectorHook<RootState> = useSelector;
