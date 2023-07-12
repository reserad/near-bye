import { useApolloClient } from "@apollo/client";
import { PostVoteDocument } from "../../../gql/graphql";
import { useCallback } from "react";
import { VotePayload } from "../components/postCard";

export const useVotePost = () => {
  const client = useApolloClient();
  const votePost = useCallback(
    async (payload: VotePayload) => {
      console.info("PostVote mutation started");
      try {
        const { postId, voteType } = payload;
        const { data, errors } = await client.mutate({
          mutation: PostVoteDocument,
          variables: {
            postVoteInput: {
              postId,
              type: voteType,
            },
          },
        });
        if (errors) {
          throw errors;
        }
        console.info("PostVote mutation succeeded");
        return data.postVote;
      } catch (e) {
        console.info("PostVote mutation failed", e);
        throw e;
      }
    },
    [client],
  );
  return { votePost };
};
