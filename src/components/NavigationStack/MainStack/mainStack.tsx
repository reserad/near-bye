import React from "react";
import { FeedContainer } from "../../../modules/feed/feedContainer";
import { MainStackParamList } from "../../../navigation/types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AccountContainer } from "../../../modules/account/accountContainer";

export const MainStack = () => {
  const Tab = createBottomTabNavigator<MainStackParamList>();
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Feed" component={FeedContainer} />
      <Tab.Screen name="Account" component={AccountContainer} />
    </Tab.Navigator>
  );
};
