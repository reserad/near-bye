import { useApolloClient } from "@apollo/client";
import { VerifyOtpDocument } from "../../../gql/graphql";
import { useCallback } from "react";
import { VerifyOtpDto } from "../types/verifyOtpDto";
import { isApolloError } from "../../../shared/utils/isApolloError";

export const useVerifyOtp = () => {
  const client = useApolloClient();
  const verifyOtp = useCallback(
    async (payload: VerifyOtpDto) => {
      console.info("VerifyOtp mutation started");
      try {
        const { phoneNumber, code } = payload;
        const { data, errors } = await client.mutate({
          mutation: VerifyOtpDocument,
          variables: {
            otpVerifyInput: {
              phoneNumber,
              code,
            },
          },
        });
        if (errors) {
          console.log(errors);
          throw errors;
        }
        console.info("VerifyOtp mutation succeeded");
        return data.verifyOtp;
      } catch (e) {
        console.error("VerifyOtp mutation failed");
        if (isApolloError(e)) {
          console.info(e.graphQLErrors);
        }
        throw e;
      }
    },
    [client],
  );
  return { verifyOtp };
};
