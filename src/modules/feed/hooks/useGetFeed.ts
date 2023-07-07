import { useApolloClient } from "@apollo/client";
import { FeedGetDocument } from "../../../gql/graphql";
import { useGeoLocation } from "./useGeoLocation";
import { useCallback } from "react";

export const useGetFeed = () => {
  const client = useApolloClient();
  const { getCoordinates } = useGeoLocation();
  const getFeed = useCallback(
    async ({ offset, take = 20 }: { offset: number; take?: number }) => {
      console.info("GetFeed query started");
      try {
        const { latitude, longitude } = await getCoordinates();
        const { data, errors } = await client.query({
          query: FeedGetDocument,
          variables: {
            feedGetInput: {
              latitude,
              longitude,
              offset,
              take,
            },
          },
        });
        if (errors) {
          throw errors;
        }
        console.info("GetFeed query succeeded");
        return data.feedGet;
      } catch (e) {
        console.info("GetFeed query failed", e);
        throw e;
      }
    },
    [client, getCoordinates],
  );
  return { getFeed };
};
