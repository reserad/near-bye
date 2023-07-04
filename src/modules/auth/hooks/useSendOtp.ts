import { useApolloClient } from "@apollo/client";
import { SendOtpDocument } from "../../../gql/graphql";
import { useCallback } from "react";
import { SendOtpDto } from "../types/sendOtpDto";

export const useSendOtp = () => {
  const client = useApolloClient();
  const sendOtp = useCallback(
    async (payload: SendOtpDto) => {
      console.info("SendOtp mutation started");
      try {
        const { phoneNumber } = payload;
        const { data, errors } = await client.mutate({
          mutation: SendOtpDocument,
          variables: {
            otpSendInput: {
              phoneNumber,
            },
          },
        });
        if (errors) {
          throw errors;
        }
        console.info("SendOtp mutation succeeded");
        return data.sendOtp;
      } catch (e) {
        console.info("SendOtp mutation failed", e);
        throw e;
      }
    },
    [client],
  );
  return { sendOtp };
};
