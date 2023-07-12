import { useApolloClient } from "@apollo/client";
import { useCallback } from "react";
import { UserGetDocument } from "../../../gql/graphql";

export const useGetUser = () => {
  const client = useApolloClient();
  const getUser = useCallback(async () => {
    console.info("UserGet query started");
    try {
      const { data, errors } = await client.query({
        query: UserGetDocument,
        variables: {},
      });
      if (errors) {
        throw errors;
      }
      console.info("UserGet query succeeded");
      return data.userGet;
    } catch (e) {
      console.info("UserGet query failed", e);
      throw e;
    }
  }, [client]);
  return { getUser };
};
