import { combineReducers } from "@reduxjs/toolkit";
import { RootState } from "./rootState";
import { UserReducer } from "./user/reducer";
import { PostReducer } from "./post/reducer";

export const rootReducer = combineReducers<RootState>({
  user: UserReducer,
  posts: PostReducer,
});
