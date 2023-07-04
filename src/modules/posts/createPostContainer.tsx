import React from "react";
import { MainStackProps } from "../../navigation/types";
import {
  CreatePostPayload,
  CreatePostScreen,
} from "./components/createPostScreen";
import { useCreatePost } from "./hooks/useCreatePost";
import { useNewDispatch } from "../../store/hooks/useNewDispatch";
import { addNewlyCreatedPost } from "../../store/post/actions/addNewlyCreatedPost";

export const CreatePostContainer = ({
  navigation,
}: MainStackProps<"CreatePost">) => {
  const { createPost } = useCreatePost();
  const dispatch = useNewDispatch();
  const onSubmit = async (payload: CreatePostPayload) => {
    const post = await createPost(payload);
    dispatch(addNewlyCreatedPost(post));
    navigation.goBack();
  };
  return <CreatePostScreen onSubmit={onSubmit} />;
};
