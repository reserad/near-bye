import React from "react";
import { MainStackProps } from "../../navigation/types";
import {
  CreatePostPayload,
  CreatePostScreen,
} from "./components/createPostScreen";
import { useCreatePost } from "./hooks/useCreatePost";

export const CreatePostContainer = ({
  navigation,
}: MainStackProps<"CreatePost">) => {
  const { createPost } = useCreatePost();
  const onSubmit = async (payload: CreatePostPayload) => {
    await createPost(payload);
    navigation.goBack();
  };
  return <CreatePostScreen onSubmit={onSubmit} />;
};
