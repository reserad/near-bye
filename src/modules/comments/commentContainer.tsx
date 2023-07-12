import React, { useCallback, useEffect, useState } from "react";
import { MainStackProps } from "../../navigation/types";
import { CommentScreen } from "./components/commentScreen";
import { Comment } from "./types/comment";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useGetComment } from "./hooks/useGetComment";
import { useNewSelector } from "../../store/hooks/useNewSelector";
import { getLastVisitedPost } from "../posts/selectors/getLastVisitedPost";
import { getPathFromCommentToRoot } from "./utils/getPathFromCommentToRoot";

export const CommentContainer = ({
  route,
  navigation,
}: MainStackProps<"Comment">) => {
  const { postId, commentId } = route.params;
  const { getComment } = useGetComment();
  const post = useNewSelector(getLastVisitedPost);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState<Comment>(null);
  const path = getPathFromCommentToRoot(post, commentId);
  const [hasCompletedFirstLoad, setHasCompletedFirstLoad] =
    useState<boolean>(false);

  const fetchComment = async () => {
    try {
      setLoading(true);
      const fetchedComment = await getComment(commentId);
      setComment(fetchedComment);
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

  const onCommentClick = useCallback(
    (commentId: string) => {
      navigation.push("MainStack", {
        screen: "Comment",
        params: { commentId, postId },
      });
    },
    [navigation],
  );

  useEffect(() => {
    fetchComment();
  }, []);

  return (
    <CommentScreen
      post={post}
      comment={comment}
      path={path}
      loading={loading}
      onCommentClick={onCommentClick}
      onRefresh={fetchComment}
      showShimmer={!hasCompletedFirstLoad}
    />
  );
};
