import React, { useCallback, useState } from "react";
import { sendOtp } from "./utils";
import { SendOtpDto } from "./types/sendOtpDto";
import { AuthStackProps } from "../../navigation/types";
import { SendOtpScreen } from "./components/sendOtpScreen";

export const SendOtpContainer = ({
  route,
  navigation,
}: AuthStackProps<"SendOtp">) => {
  const [isLoading, setIsLoading] = useState(false);
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
