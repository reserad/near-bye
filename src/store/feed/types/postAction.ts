import { AddNewlyCreatedPostAction } from "../../feed/types/addNewlyCreatedPostAction";
import { VotePostAction } from "./votePostAction";

export type PostAction = AddNewlyCreatedPostAction | VotePostAction;
