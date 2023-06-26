import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { FeedContainer } from "../../../modules/feed/feedContainer";

export const AuthenticatedStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Feed"
      screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="Feed" component={FeedContainer} />
    </Stack.Navigator>
  );
};
