import { ActionType } from "../../actionType";
import { VotePayload } from "../../../modules/feed/components/card";
import { VotePostAction } from "../types/votePostAction";

export const updatePostAfterVoting = (
  response: VotePayload,
): VotePostAction => ({
  type: ActionType.VOTE_POST,
  payload: response,
});
