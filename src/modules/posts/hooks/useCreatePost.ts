import { useApolloClient } from "@apollo/client";
import { PostCreateDocument } from "../../../gql/graphql";
import { useGeoLocation } from "../../feed/hooks/useGeoLocation";
import { useCallback } from "react";
import { useNewSelector } from "../../../store/hooks/useNewSelector";
import { getCurrentSignedInUser } from "../../auth/selectors/getCurrentSignedInUser";
import { CreatePostPayload } from "../components/createPostScreen";

export const useCreatePost = () => {
  const client = useApolloClient();
  const userId = useNewSelector(getCurrentSignedInUser);
  const { getCoordinates } = useGeoLocation();
  const createPost = useCallback(
    async (payload: CreatePostPayload) => {
      console.info("PostCreate mutation started");
      try {
        const { body } = payload;
        const { latitude, longitude } = await getCoordinates();
        console.log({ body, userId, latitude, longitude });
        const { data, errors } = await client.mutate({
          mutation: PostCreateDocument,
          variables: {
            postCreateInput: {
              body,
              userId,
              latitude,
              longitude,
            },
          },
        });
        if (errors) {
          throw errors;
        }
        console.info("PostCreate mutation succeeded");
        return data.postCreate;
      } catch (e) {
        console.info("PostCreate mutation failed", e);
        throw e;
      }
    },
    [client, getCoordinates],
  );
  return { createPost };
};
