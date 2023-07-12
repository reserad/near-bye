import React, { useEffect, useState } from "react";
import { MainStackProps } from "../../navigation/types";
import { PostScreen } from "./components/postScreen";
import { useGetPost } from "./hooks/useGetPost";
import { Post } from "./types/post";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export const PostContainer = ({
  navigation,
  route,
}: MainStackProps<"Post">) => {
  const { postId } = route.params;
  const { getPost } = useGetPost();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Post>(null);
  const [hasCompletedFirstLoad, setHasCompletedFirstLoad] =
    useState<boolean>(false);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const fetchedPost = await getPost(postId);
      setPost(fetchedPost);
    } catch (er) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong",
      });
    } finally {
      if (!hasCompletedFirstLoad) {
        const timeout = setTimeout(() => {
          setHasCompletedFirstLoad(true);
          clearTimeout(timeout);
        }, 500);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <PostScreen
      post={post}
      loading={loading}
      onRefresh={fetchPost}
      showShimmer={!hasCompletedFirstLoad}
    />
  );
};
