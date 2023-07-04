import React, { useCallback, useState } from "react";
import { VerifyOtpScreen } from "./components/verifyOtpScreen";
import { login } from "../../store/user/actions/login";
import { useNewDispatch } from "../../store/hooks/useNewDispatch";
import { VerifyOtpDto } from "./types/verifyOtpDto";
import { AuthStackProps } from "../../navigation/types";
import { HttpStatusCode } from "axios";
import Toast from "react-native-toast-message";
import { useVerifyOtp } from "./hooks/useVerifyOtp";
import { isApolloError } from "../../shared/utils/isApolloError";
import { getStatusCodeOfApolloError } from "../../shared/utils/getStatusCodeOfApolloError";

export const VerifyOtpContainer = ({
  route,
  navigation,
}: AuthStackProps<"VerifyOtp">) => {
  const { phoneNumber } = route.params;
  const dispatch = useNewDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { verifyOtp } = useVerifyOtp();
  const handleOnPress = useCallback(
    async (code: string) => {
      if (code && code.length === 6) {
        setIsLoading(true);
        try {
          const payload: VerifyOtpDto = { phoneNumber, code };
          const response = await verifyOtp(payload);
          dispatch(login(response));
          const timeout = setTimeout(() => {
            navigation.navigate("MainStack", { screen: "BottomTabs" });
            clearTimeout(timeout);
          }, 500);
        } catch (err) {
          if (isApolloError(err)) {
            if (getStatusCodeOfApolloError(err) === HttpStatusCode.NotFound) {
              Toast.show({
                type: "error",
                text1: "Error",
                text2: "The entered code is not valid",
              });
            }
          }
        } finally {
          setIsLoading(false);
        }
      }
    },
    [phoneNumber, verifyOtp, setIsLoading],
  );
  return <VerifyOtpScreen onSubmit={handleOnPress} isLoading={isLoading} />;
};
