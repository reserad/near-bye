import React, { useCallback, useState } from "react";
import { VerifyOtpScreen } from "./components/verifyOtpScreen";
import { login } from "../../store/user/actions/login";
import { useNewDispatch } from "../../store/hooks/useNewDispatch";
import { verifyOtp } from "./utils";
import { VerifyOtpDto } from "./types/verifyOtpDto";

export const VerifyOtpContainer = ({ route, navigation }) => {
  const { phoneNumber } = route.params;
  const dispatch = useNewDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const handleOnPress = useCallback(
    async (code: string) => {
      if (code && code.length === 6) {
        setIsLoading(true);
        try {
          const payload: VerifyOtpDto = { phoneNumber, code };
          const response = await verifyOtp(payload);
          dispatch(login(response));
          navigation.navigate("Feed");
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
        }
      }
    },
    [phoneNumber, verifyOtp, setIsLoading],
  );
  return <VerifyOtpScreen onSubmit={handleOnPress} isLoading={isLoading} />;
};
