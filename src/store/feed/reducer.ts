import { VoteStatus, VoteType } from "../../gql/graphql";
import { Post } from "../../modules/posts/types/post";
import { RootAction } from "../action";
import { ActionType } from "../actionType";
import { FeedState } from "./feedState";

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
      const newFeedItem: Post = {
        __typename: "UserPost",
        id: post.id,
        body: post.body,
        userVoteStatus: VoteStatus.Upvoted,
        score: 1,
        createdAt: post.createdAt,
        author: post.author,
        comments: [],
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
                  score: item.score - 1,
                };
              } else if (item.userVoteStatus === VoteStatus.Downvoted) {
                return {
                  ...item,
                  userVoteStatus: VoteStatus.Upvoted,
                  score: item.score + 2,
                };
              } else {
                return {
                  ...item,
                  userVoteStatus: VoteStatus.Upvoted,
                  score: item.score + 1,
                };
              }
            }
            case VoteType.Downvote: {
              if (item.userVoteStatus === VoteStatus.Downvoted) {
                return {
                  ...item,
                  userVoteStatus: VoteStatus.Neither,
                  score: item.score + 1,
                };
              } else if (item.userVoteStatus === VoteStatus.Upvoted) {
                return {
                  ...item,
                  userVoteStatus: VoteStatus.Downvoted,
                  score: item.score - 2,
                };
              } else {
                return {
                  ...item,
                  userVoteStatus: VoteStatus.Downvoted,
                  score: item.score - 1,
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
