import React, { createRef, useRef } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Screen } from "../../../components/Screen/screen";
import { Theme } from "../../../shared/theme";
import { FlashList, MasonryFlashListRef } from "@shopify/flash-list";
import { PostCard } from "../../posts/components/postCard";
import { ShimmerCard } from "../../feed/components/shimmerCard";
import { Post } from "../../posts/types/post";
import { Comment } from "../types/comment";
import { CommentCard } from "./commentCard";

export type ScreenProps = {
  path: Comment[];
  post: Post;
  comment: Comment;
  loading: boolean;
  showShimmer: boolean;
  onRefresh(): void;
  onCommentClick(commentId: string): void;
};

export type CommentProps = {
  rootComment: Comment;
  comment: Comment;
  onCommentClick(commentId: string): void;
};

export const CommentListItem = ({
  rootComment,
  comment,
  onCommentClick,
}: CommentProps) => {
  const isRootComment = comment.id === rootComment.id;
  return (
    <CommentCard
      item={comment}
      onVote={null}
      isRootComment={isRootComment}
      onClick={onCommentClick}
    />
  );
};

export const CommentScreen = ({
  path,
  post,
  comment,
  loading,
  onCommentClick,
  onRefresh,
  showShimmer,
}: ScreenProps) => {
  const scrollViewRef = useRef<FlashList<Comment>>(null);
  if (!showShimmer && post && comment) {
    const timeout = setTimeout(() => {
      scrollViewRef.current.scrollToIndex({
        index: path.length - 1,
        animated: true,
      });
      clearTimeout(timeout);
    }, 500);
  }

  return (
    <Screen showBackButton style={styles.screen}>
      <View style={styles.container}>
        {showShimmer ? <ShimmerCard /> : null}
        {!showShimmer && post && comment ? (
          <FlashList
            ref={scrollViewRef}
            data={path.concat(comment.children || [])}
            renderItem={({ item }) => (
              <CommentListItem
                rootComment={comment}
                comment={item}
                onCommentClick={onCommentClick}
              />
            )}
            estimatedItemSize={200}
            contentContainerStyle={styles.list}
            ListEmptyComponent={
              <Text style={styles.noComments}>Be the first to comment</Text>
            }
            ListHeaderComponent={<PostCard item={post} onVote={null} />}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={onRefresh} />
            }
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
  list: {
    backgroundColor: Theme.color.lightGray,
  },
  listItem: {
    height: 100,
    padding: Theme.padding.P4,
    borderRadius: Theme.padding.P2,
    marginBottom: Theme.padding.P5,
    backgroundColor: Theme.color.white,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  shimmerContainer: {
    padding: Theme.padding.P4,
  },
  noComments: {
    textAlign: "center",
  },
});
