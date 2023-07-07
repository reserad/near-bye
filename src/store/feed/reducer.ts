import { VoteStatus } from "../../gql/graphql";
import { RootAction } from "../action";
import { ActionType } from "../actionType";
import { FeedState } from "./feedState";
import { FeedItem } from "./types/feed";

const initialState: FeedState = {
  feed: [],
};

export const FeedReducer = (
  state: FeedState = initialState,
  action: RootAction,
): FeedState => {
  switch (action.type) {
    case ActionType.SET_USER_FEED:
      return {
        ...state,
        feed: action.payload,
      };
    case ActionType.ADD_USER_POST:
      const post = action.payload;
      const newFeedItem: FeedItem = {
        id: post.id,
        body: post.body,
        userVoteStatus: VoteStatus.Upvoted,
        upvotes: 1,
        downvotes: 0,
        createdAt: post.createdAt,
        authorImage: post.author.profileImage,
        authorId: post.author.id,
      };
      return {
        ...state,
        feed: [newFeedItem].concat(state.feed),
      };
    default:
      return state;
  }
};
