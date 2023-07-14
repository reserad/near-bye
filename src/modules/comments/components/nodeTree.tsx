import { useRef, useState } from "react";
import { TreeNode } from "../types/treeNode";
import {
  Animated,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Theme } from "../../../shared/theme";
import * as Haptics from "expo-haptics";
import { CommentCard } from "./commentCard";
import { FlashList } from "@shopify/flash-list";
import { PostCard } from "../../posts/components/postCard";
import { Post } from "../../posts/types/post";

const colors = [
  "#00BFFF",
  "#DB7093",
  "#FF1493",
  "#D8BFD8",
  "#DA70D6",
  "#191970",
  "#696969",
  "#008B8B",
  "#FF4500",
];

const Node = ({ node, depth }: { node: TreeNode; depth: number }) => {
  const [visible, setVisible] = useState(() => depth === 0);
  const fadeAnim = useRef(new Animated.Value(depth === 0 ? 1 : 0)).current;
  const nodes = node.children;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setVisible(true);
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
    });
  };

  const handleLongPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    if (visible) {
      fadeOut();
    } else {
      fadeIn();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={nodes.length === 0}
        onLongPress={handleLongPress}
        activeOpacity={0.75}>
        <CommentCard item={node} onVote={null} />
      </TouchableOpacity>
      {visible && nodes.length > 0 ? (
        <Animated.View
          style={[
            {
              opacity: fadeAnim,
            },
          ]}>
          <View style={styles.nestedList}>
            <View
              style={{
                width: Theme.padding.P1,
                backgroundColor: colors[colors.length % (depth + 1)],
                marginStart: Theme.padding.P4,
              }}
            />
            <FlashList
              data={node.children}
              renderItem={({ item }) => <Node node={item} depth={depth + 1} />}
              estimatedItemSize={200}
            />
          </View>
        </Animated.View>
      ) : null}
    </View>
  );
};

type NodeTreeProps = {
  post: Post;
  tree: TreeNode[];
  loading: boolean;
  onRefresh(): void;
};

export const NodeTree = ({ post, tree, loading, onRefresh }: NodeTreeProps) => {
  return (
    <FlashList
      data={tree}
      renderItem={({ item }) => <Node node={item} depth={0} />}
      estimatedItemSize={500}
      ListHeaderComponent={<PostCard item={post} onVote={null} />}
      ListEmptyComponent={
        <Text style={styles.noComments}>Be the first to comment</Text>
      }
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    flex: 1,
    flexDirection: "column",
  },
  tree: {
    padding: Theme.padding.P4,
  },
  nestedList: {
    minHeight: 2,
    flexDirection: "row",
  },
  noComments: {
    textAlign: "center",
  },
});
