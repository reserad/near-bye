import React from "react";
import { RootStackParamList } from "../../navigation/types";
import { AuthStack } from "./AuthStack/authStack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNewSelector } from "../../store/hooks/useNewSelector";
import { getIsAuthenticated } from "../../modules/auth/selectors/getIsAuthenticated";
import { MainStack } from "./MainStack/mainStack";

export const NavigationStack = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const isAuthenticated = useNewSelector(getIsAuthenticated);
  return (
    <Stack.Navigator
      id="RootStack"
      initialRouteName={"MainStack"}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="AuthStack" component={AuthStack} />
      {isAuthenticated ? (
        <Stack.Screen name="MainStack" component={MainStack} />
      ) : null}
    </Stack.Navigator>
  );
};
