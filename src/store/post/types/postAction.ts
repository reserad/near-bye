import { AddNewlyCreatedPostAction } from "./addNewlyCreatedPostAction";
import { SetPostAction } from "./setPostAction";
import { VotePostAction } from "./votePostAction";

export type PostAction =
  | AddNewlyCreatedPostAction
  | VotePostAction
  | SetPostAction;
