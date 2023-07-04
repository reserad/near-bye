import { AddNewlyCreatedPostAction } from "./addNewlyCreatedPostAction";
import { SetUserPostsAction } from "./setUserPostsAction";

export type PostAction = SetUserPostsAction | AddNewlyCreatedPostAction;
