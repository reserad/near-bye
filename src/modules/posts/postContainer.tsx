import React, { useEffect, useState } from "react";
import { MainStackProps } from "../../navigation/types";
import { useNewDispatch } from "../../store/hooks/useNewDispatch";
import { PostScreen } from "./components/postScreen";
import { useGetPost } from "./hooks/useGetPost";
import { Post } from "./types/post";
import {
  TreeNode,
  convertFlatArrayToNodeTree,
  flatten,
} from "./utils/convertFlatArrayToTree";

export const PostContainer = ({
  navigation,
  route,
}: MainStackProps<"Post">) => {
  const { feedItem } = route.params;
  const { getPost } = useGetPost();
  const dispatch = useNewDispatch();
  const [post, setPost] = useState<Post>(null);
  const [commentTreeNodes, setCommentTreeNodes] = useState<TreeNode[]>(null);

  const fetchPost = async () => {
    if (feedItem.id) {
      const fetchedPost = await getPost(feedItem.id);
      const treeNodes = convertFlatArrayToNodeTree(fetchedPost.comments);
      setCommentTreeNodes(treeNodes);
      setPost(fetchedPost);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);
  return post ? (
    <PostScreen post={feedItem} treeNodes={commentTreeNodes} />
  ) : null;
};
