import React, { useEffect, useState } from "react";
import { MainStackProps } from "../../navigation/types";
import { useNewDispatch } from "../../store/hooks/useNewDispatch";
import { PostScreen } from "./components/postScreen";
import { useGetPost } from "./hooks/useGetPost";
import { Post } from "./types/post";
import {
  TreeNode,
  convertFlatArrayToNodeTree,
} from "./utils/convertFlatArrayToTree";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export const PostContainer = ({
  navigation,
  route,
}: MainStackProps<"Post">) => {
  const { feedItem } = route.params;
  const { getPost } = useGetPost();
  const dispatch = useNewDispatch();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Post>(null);
  const [commentTreeNodes, setCommentTreeNodes] = useState<TreeNode[]>(null);

  const fetchPost = async () => {
    if (feedItem.id) {
      try {
        setLoading(true);
        const fetchedPost = await getPost(feedItem.id);
        const treeNodes = convertFlatArrayToNodeTree(fetchedPost.comments);
        setCommentTreeNodes(treeNodes);
        setPost(fetchedPost);
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
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <PostScreen post={post} treeNodes={commentTreeNodes} loading={loading} />
  );
};
