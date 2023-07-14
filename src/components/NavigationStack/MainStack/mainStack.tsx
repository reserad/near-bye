import React from "react";
import { MainStackParamList } from "../../../navigation/types";
import { createStackNavigator } from "@react-navigation/stack";
import { CreatePostContainer } from "../../../modules/posts/createPostContainer";
import { BottomTabStack } from "../BottomTabStack/bottomTabStack";
import { PostContainer } from "../../../modules/posts/postContainer";

export const MainStack = () => {
  const Stack = createStackNavigator<MainStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="BottomTabs" component={BottomTabStack} />
      <Stack.Screen name="CreatePost" component={CreatePostContainer} />
      <Stack.Screen name="Post" component={PostContainer} />
    </Stack.Navigator>
  );
};
