import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  StyleSheet,
  TouchableWithoutFeedback,
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
import { ProfileButton } from "./profileButton";
import { SearchButton } from "./searchButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FeedHeader } from "./feedHeader";

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
  const insets = useSafeAreaInsets();
  const scrollOffset = useRef(0);
  const [showAnimatedContent, setShowAnimatedContent] = useState(true);
  const navigation = useNavigation();
  const bottomSlideAnim = useRef(new Animated.Value(0)).current;
  const topSlideAnim = useRef(new Animated.Value(0)).current;
  const shrinkAnim = useRef(new Animated.Value(1)).current;
  const isAnimating = useRef(false);
  const headerHeight = Theme.padding.P15;
  const scrollViewRef = useRef<FlashList<Post>>(null);

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: Theme.color.lightGray,
    },
    animatedScreen: {
      flex: 1,
    },
    header: {
      height: headerHeight + insets.top,
      paddingTop: insets.top,
      paddingHorizontal: Theme.padding.P4,
      justifyContent: "center",
      flexDirection: "row",
      position: "absolute",
      left: 0,
      right: 0,
      zIndex: 1,
      elevation: 1,
      backgroundColor: Theme.color.white,
      transform: [{ translateY: topSlideAnim }],
      borderBottomWidth: 1,
      borderColor: Theme.color.lighterGray,
    },
    headerChild: {
      flex: 1,
      justifyContent: "center",
    },
    feedHeader: { marginTop: headerHeight + insets.top },
  });

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
    }).start(() => setShowAnimatedContent(false));
    Animated.timing(bottomSlideAnim, {
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
        transform: [{ translateY: bottomSlideAnim }],
      },
    });
  };

  const showBottomTab = (animationDuration: number) => {
    isAnimating.current = true;
    Animated.timing(shrinkAnim, {
      toValue: 1,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
    Animated.timing(bottomSlideAnim, {
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
        transform: [{ translateY: bottomSlideAnim }],
      },
    });
  };

  const hideTopTab = (animationDuration: number) => {
    isAnimating.current = true;
    Animated.timing(topSlideAnim, {
      toValue: -1 * (headerHeight + insets.top),
      duration: animationDuration,
      useNativeDriver: true,
    }).start(() => (isAnimating.current = false));
  };

  const showTopTab = (animationDuration: number) => {
    isAnimating.current = true;
    Animated.timing(topSlideAnim, {
      toValue: 0,
      duration: animationDuration,
      useNativeDriver: true,
    }).start(() => (isAnimating.current = false));
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
            if (event.contentOffset.y > headerHeight) {
              setShowAnimatedContent(false);
              hideBottomTab(animationDuration);
              hideTopTab(animationDuration);
            }
          } else {
            setShowAnimatedContent(true);
            showBottomTab(animationDuration);
            showTopTab(animationDuration);
          }
        }
      }
    },
    [scrollOffset],
  );

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() =>
          scrollViewRef.current
            ? scrollViewRef.current.scrollToOffset({
                animated: true,
                offset: 0,
              })
            : null
        }>
        <Animated.View style={[styles.header]}>
          <View style={styles.headerChild}>
            <ProfileButton />
          </View>
          <View style={[styles.headerChild, { alignItems: "flex-end" }]}>
            <SearchButton />
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
      <Screen style={styles.screen}>
        {showShimmer ? (
          <View>
            <FeedHeader />
            <ShimmerCard />
            <ShimmerCard />
            <ShimmerCard />
          </View>
        ) : (
          <FlashList
            ref={scrollViewRef}
            data={feed}
            renderItem={renderCard}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={onRefresh}
                progressViewOffset={headerHeight}
              />
            }
            ListHeaderComponent={<FeedHeader style={styles.feedHeader} />}
            estimatedItemSize={250}
            onScroll={handleOnScroll}
          />
        )}
      </Screen>
      <FAB
        onPress={onFABPress}
        visible={showAnimatedContent}
        offset={{ y: Theme.padding.P10, x: 0 }}
        style={{ transform: [{ scale: shrinkAnim }] }}
      />
    </>
  );
};
