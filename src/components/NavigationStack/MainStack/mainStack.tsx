import React from "react";
import { FeedContainer } from "../../../modules/feed/feedContainer";
import { createStackNavigator } from "@react-navigation/stack";
import { MainStackParamList } from "../../../navigation/types";

export const MainStack = () => {
  const Stack = createStackNavigator<MainStackParamList>();
  return (
    <Stack.Navigator
      initialRouteName="Feed"
      screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="Feed" component={FeedContainer} />
    </Stack.Navigator>
  );
};
