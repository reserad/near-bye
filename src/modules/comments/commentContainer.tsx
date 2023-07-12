import React, { useEffect, useState } from "react";
import { MainStackProps } from "../../navigation/types";
import { CommentScreen } from "./components/commentScreen";
import { Comment } from "./types/comment";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useGetComment } from "./hooks/useGetComment";

export const CommentContainer = ({
  route,
  navigation,
}: MainStackProps<"Comment">) => {
  const { post, commentId } = route.params;
  const { getComment } = useGetComment();
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState<Comment>(null);

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
      const timeout = setTimeout(() => {
        setLoading(false);
        clearTimeout(timeout);
      }, 500);
    }
  };

  useEffect(() => {
    fetchComment();
  }, []);

  return <CommentScreen post={post} comment={comment} loading={loading} />;
};
