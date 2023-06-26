import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { LoginContainer } from "../../../modules/auth/loginContainer";
import { OtpContainer } from "../../../modules/auth/otpContainer";
import { RootStackParamList } from "../../../navigation/types";

export const UnauthenticatedStack = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="Login" component={LoginContainer} />
      <Stack.Screen name="Otp" component={OtpContainer} />
    </Stack.Navigator>
  );
};
