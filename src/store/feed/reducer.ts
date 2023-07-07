import { VoteStatus, VoteType } from "../../gql/graphql";
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
    case ActionType.VOTE_POST:
      const { postId, voteType } = action.payload;
      const newFeed = state.feed.map(item => {
        if (item.id === postId) {
          switch (voteType) {
            case VoteType.Upvote: {
              if (item.userVoteStatus === VoteStatus.Upvoted) {
                return {
                  ...item,
                  userVoteStatus: VoteStatus.Neither,
                  upvotes: item.upvotes - 1,
                };
              } else if (item.userVoteStatus === VoteStatus.Downvoted) {
                return {
                  ...item,
                  userVoteStatus: VoteStatus.Upvoted,
                  downvotes: item.downvotes - 1,
                  upvotes: item.upvotes + 1,
                };
              } else {
                return {
                  ...item,
                  userVoteStatus: VoteStatus.Upvoted,
                  upvotes: item.upvotes + 1,
                };
              }
            }
            case VoteType.Downvote: {
              if (item.userVoteStatus === VoteStatus.Downvoted) {
                return {
                  ...item,
                  userVoteStatus: VoteStatus.Neither,
                  downvotes: item.downvotes - 1,
                };
              } else if (item.userVoteStatus === VoteStatus.Upvoted) {
                return {
                  ...item,
                  userVoteStatus: VoteStatus.Downvoted,
                  downvotes: item.downvotes + 1,
                  upvotes: item.upvotes - 1,
                };
              } else {
                return {
                  ...item,
                  userVoteStatus: VoteStatus.Downvoted,
                  downvotes: item.downvotes + 1,
                };
              }
            }
            default: {
              return { ...item, userVoteStatus: VoteStatus.Neither };
            }
          }
        }
        return item;
      });
      return {
        ...state,
        feed: newFeed,
      };
    default:
      return state;
  }
};
