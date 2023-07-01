import React from "react";
import { FeedContainer } from "../../../modules/feed/feedContainer";
import { MainStackParamList } from "../../../navigation/types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AccountContainer } from "../../../modules/account/accountContainer";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const MainStack = () => {
  const Tab = createBottomTabNavigator<MainStackParamList>();
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Feed"
        component={FeedContainer}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountContainer}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
