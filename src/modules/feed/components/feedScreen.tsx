import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from "react-native";
import { Screen } from "../../../components/Screen/screen";
import { PostCard, VotePayload } from "../../posts/components/postCard";
import { useCallback, useRef, useState } from "react";
import { Theme } from "../../../shared/theme";
import { FAB } from "../../../components/FAB/fab";
import { ShimmerCard } from "./shimmerCard";
import { Post } from "../../posts/types/post";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";

interface RenderItem {
  item: Post;
}

interface FeedScreenProps extends ViewProps {
  feed: Post[];
  onRefresh(): void;
  loading?: boolean;
  onFABPress(): void;
  onVote(payload: VotePayload): void;
  onCardPress(item: Post): void;
  onShowImageModal(imageUris: string[], index: number): void;
  showShimmer: boolean;
}

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>What's happening near you</Text>
    </View>
  );
};

export const FeedScreen = ({
  feed,
  onRefresh,
  loading,
  onFABPress,
  onCardPress,
  onVote,
  onShowImageModal,
  showShimmer,
}: FeedScreenProps) => {
  const scrollOffset = useRef(0);
  const [showFAB, setShowFAB] = useState(true);
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(0)).current;
  const shrinkAnim = useRef(new Animated.Value(1)).current;
  const isAnimating = useRef(false);
  const renderCard = useCallback(({ item }: RenderItem) => {
    return (
      <PostCard
        key={item.id}
        item={item}
        onClick={() => onCardPress(item)}
        onVote={onVote}
        onShowImageModal={onShowImageModal}
      />
    );
  }, []);

  const hideBottomTab = (animationDuration: number) => {
    isAnimating.current = true;
    Animated.timing(shrinkAnim, {
      toValue: 0,
      duration: animationDuration,
      useNativeDriver: true,
    }).start(() => setShowFAB(false));
    Animated.timing(slideAnim, {
      toValue: 60,
      duration: animationDuration,
      useNativeDriver: true,
    }).start(() => (isAnimating.current = false));
    navigation.setOptions({
      tabBarStyle: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        transform: [{ translateY: slideAnim }],
      },
    });
  };

  const showBottomTab = (animationDuration: number) => {
    setShowFAB(true);
    isAnimating.current = true;
    Animated.timing(shrinkAnim, {
      toValue: 1,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: animationDuration,
      useNativeDriver: true,
    }).start(() => (isAnimating.current = false));
    navigation.setOptions({
      tabBarStyle: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        transform: [{ translateY: slideAnim }],
      },
    });
  };

  const handleOnScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const animationDuration = 300;
      const event = e.nativeEvent;
      if (
        event.contentOffset.y >= 0 &&
        event.contentOffset.y !== scrollOffset.current
      ) {
        let down = event.contentOffset.y > scrollOffset.current ? true : false;
        scrollOffset.current = event.contentOffset.y;
        if (isAnimating.current === false) {
          if (down) {
            hideBottomTab(animationDuration);
          } else {
            showBottomTab(animationDuration);
          }
        }
      }
    },
    [scrollOffset],
  );

  return (
    <>
      <Screen>
        {showShimmer ? (
          <View style={styles.shimmerContainer}>
            <Header />
            <ShimmerCard />
            <ShimmerCard />
            <ShimmerCard />
          </View>
        ) : (
          <FlashList
            data={feed}
            renderItem={renderCard}
            contentContainerStyle={styles.list}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={onRefresh} />
            }
            ListHeaderComponent={<Header />}
            estimatedItemSize={250}
            onScroll={handleOnScroll}
          />
        )}
      </Screen>
      <FAB
        onPress={onFABPress}
        visible={showFAB}
        offset={{ y: Theme.padding.P10, x: 0 }}
        style={{ transform: [{ scale: shrinkAnim }] }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: Theme.color.lightGray,
  },
  shimmerContainer: {},
  header: {
    marginVertical: Theme.padding.P4,
    height: Theme.padding.P12,
    justifyContent: "center",
  },
  headerText: {
    textAlign: "center",
  },
});
