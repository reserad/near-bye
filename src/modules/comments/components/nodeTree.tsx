import { useEffect, useRef, useState } from "react";
import { TreeNode } from "../types/treeNode";
import {
  Animated,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  findNodeHandle,
} from "react-native";
import { Theme } from "../../../shared/theme";
import * as Haptics from "expo-haptics";
import { CommentCard } from "./commentCard";
import {
  AnimatedFlashList,
  FlashList,
  ListRenderItemInfo,
} from "@shopify/flash-list";
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

const ANIMATION_DURATION = 300;

const Node = ({
  node,
  depth,
  rootScrollRef,
}: {
  node: TreeNode;
  depth: number;
  rootScrollRef: React.MutableRefObject<FlashList<TreeNode>>;
}) => {
  const [visible, setVisible] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const viewRef = useRef<View>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (viewRef?.current) {
      const node = findNodeHandle(rootScrollRef.current);
      if (node) {
        viewRef.current.measureLayout(
          node,
          (_left, top, _width, _height) => {
            setOffset(top);
          },
          () => {
            return;
          },
        );
      }
    }
  }, [viewRef, rootScrollRef]);

  const nodes = node.children;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
    setVisible(true);
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
    });
  };

  const handleLongPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    if (visible) {
      fadeOut();
      const timeout = setTimeout(() => {
        rootScrollRef.current.scrollToOffset({
          animated: true,
          offset: offset,
        });
        clearTimeout(timeout);
      }, ANIMATION_DURATION);
    } else {
      fadeIn();
      const timeout = setTimeout(() => {
        rootScrollRef.current.scrollToOffset({
          animated: true,
          offset: offset,
        });
        clearTimeout(timeout);
      }, ANIMATION_DURATION);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={nodes.length === 0}
        onLongPress={handleLongPress}
        activeOpacity={0.75}>
        <View ref={viewRef}>
          <CommentCard item={node} onVote={null} />
        </View>
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
            <AnimatedFlashList
              data={node.children}
              renderItem={({ item }: ListRenderItemInfo<TreeNode>) => (
                <Node
                  node={item}
                  depth={depth + 1}
                  rootScrollRef={rootScrollRef}
                />
              )}
              estimatedItemSize={200}
              keyExtractor={(item: TreeNode) => item.id}
              scrollEnabled
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
  const scrollViewRef = useRef<FlashList<TreeNode>>(null);
  return (
    <AnimatedFlashList
      ref={scrollViewRef}
      data={tree}
      renderItem={({ item }: ListRenderItemInfo<TreeNode>) => (
        <Node node={item} depth={0} rootScrollRef={scrollViewRef} />
      )}
      estimatedItemSize={500}
      ListHeaderComponent={<PostCard item={post} onVote={null} />}
      ListEmptyComponent={
        <Text style={styles.noComments}>Be the first to comment</Text>
      }
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
      keyExtractor={item => item.id}
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
