import { useApolloClient } from "@apollo/client";
import { useCallback } from "react";
import { CommentGetDocument } from "../../../gql/graphql";

export const useGetComment = () => {
  const client = useApolloClient();
  const getComment = useCallback(
    async (commentId: string) => {
      console.info("CommentGet query started");
      try {
        const { data, errors } = await client.query({
          query: CommentGetDocument,
          variables: {
            commentGetInput: {
              commentId,
            },
          },
        });
        if (errors) {
          throw errors;
        }
        console.info("CommentGet query succeeded");
        return data.commentGet;
      } catch (e) {
        console.info("CommentGet query failed", e);
        throw e;
      }
    },
    [client],
  );
  return { getComment };
};
