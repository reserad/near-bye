import { useApolloClient } from "@apollo/client";
import { PostGetAllDocument } from "../../../gql/graphql";
import { useGeoLocation } from "../../feed/hooks/useGeoLocation";
import { useCallback } from "react";

export const useGetAllPosts = () => {
  const client = useApolloClient();
  const { getCoordinates } = useGeoLocation();
  const getAllPosts = useCallback(async () => {
    console.info("GetAllPosts query started");
    try {
      const { latitude, longitude } = await getCoordinates();
      const { data, errors } = await client.query({
        query: PostGetAllDocument,
        variables: {
          postGetAllInput: {
            latitude,
            longitude,
          },
        },
      });
      if (errors) {
        throw errors;
      }
      console.info("GetAllPosts query succeeded");
      return data.postGetAll;
    } catch (e) {
      console.info("GetAllPosts query failed", e);
      throw e;
    }
  }, [client, getCoordinates]);
  return { getAllPosts };
};
