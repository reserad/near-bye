import React, { useCallback, useState } from "react";
import { LoginScreen } from "./components/loginScreen";
import { useSendOtp } from "./hooks/useSendOtp";

export const LoginContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { sendOtp } = useSendOtp();
  const handleOnPress = useCallback(async (phoneNumber: string) => {
    if (phoneNumber && phoneNumber.length === 10) {
      setIsLoading(true);
      try {
        await sendOtp(phoneNumber);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    }
  }, []);
  return <LoginScreen onSubmit={handleOnPress} isLoading={isLoading} />;
};
