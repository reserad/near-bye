import React from "react";

import { AuthStackParamList } from "../../../navigation/types";
import { SendOtpContainer } from "../../../modules/auth/sendOtpContainer";
import { VerifyOtpContainer } from "../../../modules/auth/verifyOtpContainer";
import { createStackNavigator } from "@react-navigation/stack";

export const AuthStack = () => {
  const Stack = createStackNavigator<AuthStackParamList>();
  return (
    <Stack.Navigator
      initialRouteName="SendOtp"
      screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="SendOtp" component={SendOtpContainer} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtpContainer} />
    </Stack.Navigator>
  );
};
