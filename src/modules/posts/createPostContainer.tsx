import React from "react";
import { MainStackProps } from "../../navigation/types";
import { CreatePostScreen } from "./components/createPostScreen";

export const CreatePostContainer = ({
  navigation,
}: MainStackProps<"CreatePost">) => {
  const onSubmit = () => {
    navigation.goBack();
  };
  return <CreatePostScreen onSubmit={onSubmit} />;
};
