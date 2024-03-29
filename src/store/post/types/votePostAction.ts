import { ReduxAction } from "../..";
import { VotePayload } from "../../../modules/posts/components/postCard";
import { ActionType } from "../../actionType";

export interface VotePostAction extends ReduxAction<VotePayload> {
  type: ActionType.VOTE_POST;
}
