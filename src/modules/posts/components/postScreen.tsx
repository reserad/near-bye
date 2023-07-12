import React from "react";
import { RefreshControl, StyleSheet, Text, View } from "react-native";
import { Screen } from "../../../components/Screen/screen";
import { Theme } from "../../../shared/theme";
import { FlashList } from "@shopify/flash-list";
import { PostCard } from "./postCard";
import { ShimmerCard } from "../../feed/components/shimmerCard";
import { Post } from "../types/post";
import { CommentCard } from "../../comments/components/commentCard";
import { Comment } from "../../comments/types/comment";

export type ScreenProps = {
  post: Post;
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

export const CommentListItem = ({
  post,
  comment,
  onCommentClick,
}: CommentProps) => {
  return (
    <CommentCard
      item={comment}
      onVote={null}
      onClick={onCommentClick}
      isRootComment={false}
    />
  );
};

export const PostScreen = ({
  post,
  showShimmer,
  loading,
  onRefresh,
  onCommentClick,
}: ScreenProps) => {
  return (
    <Screen showBackButton style={styles.screen}>
      <View style={styles.container}>
        {showShimmer ? <ShimmerCard /> : null}
        {!showShimmer && post ? (
          <FlashList
            data={post.comments.filter(c => c.parentId === null)}
            renderItem={({ item }) => (
              <CommentListItem
                post={post}
                comment={item}
                onCommentClick={onCommentClick}
              />
            )}
            ListEmptyComponent={
              <Text style={styles.noComments}>Be the first to comment</Text>
            }
            estimatedItemSize={200}
            contentContainerStyle={styles.list}
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
  list: {},
  listItem: {
    padding: Theme.padding.P4,
    borderRadius: Theme.padding.P2,
    marginBottom: Theme.padding.P5,
    backgroundColor: Theme.color.white,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  body: {
    flex: 1,
    padding: Theme.padding.P4,
  },
  shimmerContainer: {
    padding: Theme.padding.P4,
  },
  upvoteButton: {
    marginRight: Theme.padding.P2,
  },
  scoreContainer: {
    marginHorizontal: Theme.padding.P2,
    width: Theme.padding.P10,
    justifyContent: "center",
    alignItems: "center",
  },
  commentContainer: {
    width: Theme.padding.P12,
    height: Theme.padding.P12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: Theme.padding.P2,
  },
  commentCount: {
    color: Theme.color.darkGray,
    marginStart: Theme.padding.P1,
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: Theme.padding.P2,
  },
  noComments: {
    textAlign: "center",
  },
});
