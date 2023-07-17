import {
  RefreshControl,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from "react-native";
import { Screen } from "../../../components/Screen/screen";
import { PostCard, VotePayload } from "../../posts/components/postCard";
import { useCallback } from "react";
import { Theme } from "../../../shared/theme";
import { FAB } from "../../../components/FAB/fab";
import { ShimmerCard } from "./shimmerCard";
import { Post } from "../../posts/types/post";
import { FlashList } from "@shopify/flash-list";

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
          />
        )}
      </Screen>
      <FAB onPress={onFABPress} />
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
