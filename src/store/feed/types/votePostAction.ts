import { ReduxAction } from "../..";
import { VotePayload } from "../../../modules/feed/components/card";
import { ActionType } from "../../actionType";

export interface VotePostAction extends ReduxAction<VotePayload> {
  type: ActionType.VOTE_POST;
}
