import { useApolloClient } from "@apollo/client";
import { useCallback } from "react";
import { UserUpdateDocument } from "../../../gql/graphql";
import { UserUpdateDto } from "../types/user-update-dto";

export const useUpdateUser = () => {
  const client = useApolloClient();
  const updateUser = useCallback(
    async (payload: UserUpdateDto) => {
      console.info("UserUpdate mutation started");
      try {
        const { data, errors } = await client.mutate({
          mutation: UserUpdateDocument,
          variables: {
            userUpdateInput: {
              ...payload,
            },
          },
        });
        if (errors) {
          throw errors;
        }
        console.info("UserUpdate mutation succeeded");
        return data.userUpdate;
      } catch (e) {
        console.info("UserUpdate mutation failed", e);
        throw e;
      }
    },
    [client],
  );
  return { updateUser };
};
