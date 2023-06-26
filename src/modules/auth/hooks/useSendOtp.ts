import { isApolloError, useApolloClient } from "@apollo/client";
import { SendOtpDocument } from "../../../gql/graphql";
import { useCallback } from "react";

export const useSendOtp = () => {
  const client = useApolloClient();
  const sendOtp = useCallback(
    async (phoneNumber: string) => {
      try {
        await client.mutate({
          mutation: SendOtpDocument,
          variables: {
            otpSendInput: {
              phoneNumber,
            },
          },
        });
      } catch (err) {
        if (err instanceof Error && isApolloError(err)) {
          console.error(err);
        }
        throw err;
      }
    },
    [client],
  );

  return {
    sendOtp,
  };
};
