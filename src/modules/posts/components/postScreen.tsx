import React from "react";
import { StyleSheet, View } from "react-native";
import { Screen } from "../../../components/Screen/screen";
import { Theme } from "../../../shared/theme";
import { ShimmerCard } from "../../feed/components/shimmerCard";
import { Post } from "../types/post";
import { Comment } from "../../comments/types/comment";
import { TreeNode } from "../../comments/types/treeNode";
import { NodeTree } from "../../comments/components/nodeTree";

export type ScreenProps = {
  post: Post;
  commentTreeNodes: TreeNode[];
  loading: boolean;
  showShimmer: boolean;
  onRefresh(): void;
  onCommentClick(commentId: string): void;
};

export type CommentProps = {
  comment: Comment;
  post: Post;
  onCommentClick(commentId: string): void;
};

export const PostScreen = ({
  post,
  commentTreeNodes,
  showShimmer,
  loading,
  onRefresh,
}: ScreenProps) => {
  return (
    <Screen showBackButton style={styles.screen}>
      <View style={styles.container}>
        {showShimmer ? <ShimmerCard /> : null}
        {!showShimmer && post ? (
          <NodeTree
            post={post}
            tree={commentTreeNodes}
            loading={loading}
            onRefresh={onRefresh}
          />
        ) : null}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Theme.color.lightGray,
  },
  container: {
    flex: 1,
  },
});
