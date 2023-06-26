import React, { useCallback, useState } from "react";
import { OtpScreen } from "./components/otpScreen";
import { useVerifyOtp } from "./hooks/useVerifyOtp";
import { OtpScreenProps } from "../../navigation/types";

export const OtpContainer = ({ route, navigation }: OtpScreenProps) => {
  const { phoneNumber } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const { verifyOtp } = useVerifyOtp();
  const handleOnPress = useCallback(
    async (code: string) => {
      console.log(code);
      if (code && code.length === 6) {
        setIsLoading(true);
        try {
          const {} = await verifyOtp(phoneNumber, code);
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
        }
      }
    },
    [phoneNumber, verifyOtp, setIsLoading],
  );
  return <OtpScreen onSubmit={handleOnPress} isLoading={isLoading} />;
};
