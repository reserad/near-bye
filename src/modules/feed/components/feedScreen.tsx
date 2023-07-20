import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  StyleSheet,
  Text,
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
import { FeedListHeader } from "./feedListHeader";

const headerBarHeight = Theme.padding.P15;

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
  const scrollViewRef = useRef<FlashList<Post>>(null);

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: Theme.color.lightGray,
    },
    animatedScreen: {
      flex: 1,
    },
    headerBar: {
      height: headerBarHeight + insets.top,
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
    headerBarChild: {
      flex: 1,
      justifyContent: "center",
    },
    feedHeader: { marginTop: headerBarHeight + insets.top },
    headerBarTitle: {
      justifyContent: "center",
      alignItems: "center",
    },
    headerBarText: {
      color: Theme.color.purple,
      fontSize: Theme.fontSize.medium,
      fontWeight: "bold",
    },
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

    Animated.parallel(
      [
        Animated.timing(shrinkAnim, {
          toValue: 0,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(bottomSlideAnim, {
          toValue: 60,
          duration: animationDuration,
          useNativeDriver: true,
        }),
      ],
      { stopTogether: false },
    ).start(() => {
      isAnimating.current = false;
      setShowAnimatedContent(false);
    });

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

    Animated.parallel(
      [
        Animated.timing(shrinkAnim, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(bottomSlideAnim, {
          toValue: 0,
          duration: animationDuration,
          useNativeDriver: true,
        }),
      ],
      { stopTogether: false },
    ).start(() => (isAnimating.current = false));

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
      toValue: -1 * (headerBarHeight + insets.top),
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
      const {
        contentOffset: { y: scrolledPosition },
      } = e.nativeEvent;
      if (scrolledPosition >= 0 && scrolledPosition !== scrollOffset.current) {
        let down = scrolledPosition > scrollOffset.current ? true : false;
        scrollOffset.current = scrolledPosition;
        if (isAnimating.current === false) {
          if (down) {
            if (scrolledPosition > headerBarHeight) {
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

  const navigateToAccountScreen = useCallback(() => {
    navigation.navigate("MainStack", { screen: "Account" });
  }, [navigation]);

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
        <Animated.View style={[styles.headerBar]}>
          <View style={styles.headerBarChild}>
            <ProfileButton onPress={navigateToAccountScreen} />
          </View>
          <View style={styles.headerBarTitle}>
            <Text style={styles.headerBarText}>NearBye</Text>
          </View>
          <View style={[styles.headerBarChild, { alignItems: "flex-end" }]}>
            <SearchButton />
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
      <Screen style={styles.screen}>
        {showShimmer ? (
          <View>
            <FeedListHeader />
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
                progressViewOffset={headerBarHeight}
              />
            }
            ListHeaderComponent={<FeedListHeader style={styles.feedHeader} />}
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
