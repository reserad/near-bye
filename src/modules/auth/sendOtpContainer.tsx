import React, { useCallback, useState } from "react";
import { SendOtpDto } from "./types/sendOtpDto";
import { AuthStackProps } from "../../navigation/types";
import { SendOtpScreen } from "./components/sendOtpScreen";
import { useSendOtp } from "./hooks/useSendOtp";

export const SendOtpContainer = ({
  route,
  navigation,
}: AuthStackProps<"SendOtp">) => {
  const [isLoading, setIsLoading] = useState(false);
  const { sendOtp } = useSendOtp();
  const handleOnPress = useCallback(async (phoneNumber: string) => {
    if (phoneNumber && phoneNumber.length === 10) {
      setIsLoading(true);
      try {
        const payload: SendOtpDto = { phoneNumber };
        await sendOtp(payload);
        navigation.navigate("VerifyOtp", { phoneNumber });
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    }
  }, []);
  return <SendOtpScreen onSubmit={handleOnPress} isLoading={isLoading} />;
};
