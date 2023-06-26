import { isApolloError, useApolloClient } from "@apollo/client";
import { VerifyOtpDocument } from "../../../gql/graphql";
import { useCallback } from "react";

export const useVerifyOtp = () => {
  const client = useApolloClient();
  const verifyOtp = useCallback(
    async (phoneNumber: string, code: string) => {
      console.log({ phoneNumber, code });
      try {
        const { data } = await client.mutate({
          mutation: VerifyOtpDocument,
          variables: {
            otpVerifyInput: {
              phoneNumber,
              code,
            },
          },
        });
        return data.verifyOtp;
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
    verifyOtp,
  };
};
