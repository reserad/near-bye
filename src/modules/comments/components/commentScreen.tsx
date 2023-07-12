import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "../../../components/Screen/screen";
import { Theme } from "../../../shared/theme";
import { FlashList } from "@shopify/flash-list";
import { Card } from "../../posts/components/postCard";
import { ShimmerCard } from "../../feed/components/shimmerCard";
import { Post } from "../../posts/types/post";
import { Comment } from "../types/comment";

export type ScreenProps = {
  post: Post;
  comment: Comment;
  loading: boolean;
};

export const CommentListItem = ({ node }: CommentProps) => {
  return (
    <>
      <View style={styles.listItem}>
        <Text>{node.body}</Text>
      </View>
    </>
  );
};

export const CommentScreen = ({ post, comment, loading }: ScreenProps) => {
  return (
    <Screen showBackButton style={styles.screen}>
      <View style={styles.container}>
        {loading ? (
          <View style={styles.shimmerContainer}>
            <ShimmerCard />
          </View>
        ) : null}
        {!loading && post && comment ? (
          <FlashList
            data={comment.}
            renderItem={({ item }) => <CommentListItem node={item} />}
            estimatedItemSize={200}
            contentContainerStyle={styles.list}
            ListHeaderComponent={<Card item={post} onVote={null} />}
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
    padding: Theme.padding.P4,
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
});
