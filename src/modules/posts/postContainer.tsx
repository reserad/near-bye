import React, { useCallback, useEffect, useState } from "react";
import { MainStackProps } from "../../navigation/types";
import { PostScreen } from "./components/postScreen";
import { useGetPost } from "./hooks/useGetPost";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useNewDispatch } from "../../store/hooks/useNewDispatch";
import { setPost } from "../../store/post/actions/setPost";
import { useNewSelector } from "../../store/hooks/useNewSelector";
import { getLastVisitedPost } from "./selectors/getLastVisitedPost";

export const PostContainer = ({
  navigation,
  route,
}: MainStackProps<"Post">) => {
  const { postId } = route.params;
  const dispatch = useNewDispatch();
  const { getPost } = useGetPost();
  const post = useNewSelector(getLastVisitedPost);
  const [loading, setLoading] = useState(true);
  const [hasCompletedFirstLoad, setHasCompletedFirstLoad] =
    useState<boolean>(false);

  const fetchPost = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedPost = await getPost(postId);
      dispatch(setPost(fetchedPost));
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
  }, [dispatch, getPost, hasCompletedFirstLoad]);

  const onCommentClick = useCallback(
    (commentId: string) => {
      navigation.navigate("MainStack", {
        screen: "Comment",
        params: { commentId, postId },
      });
    },
    [navigation],
  );

  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <PostScreen
      post={post}
      loading={loading}
      onRefresh={fetchPost}
      showShimmer={!hasCompletedFirstLoad}
      onCommentClick={onCommentClick}
    />
  );
};
