import { useApolloClient } from "@apollo/client";
import { useCallback } from "react";
import { PostGetDocument } from "../../../gql/graphql";

export const useGetPost = () => {
  const client = useApolloClient();
  const getPost = useCallback(
    async (postId: string) => {
      console.info("PostGet query started");
      try {
        const { data, errors } = await client.query({
          query: PostGetDocument,
          variables: {
            postGetInput: {
              postId,
            },
          },
        });
        if (errors) {
          throw errors;
        }
        console.info("PostGet query succeeded");
        return data.postGet;
      } catch (e) {
        console.info("PostGet query failed", e);
        throw e;
      }
    },
    [client],
  );
  return { getPost };
};
