import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  ViewProps,
} from "react-native";
import { Screen } from "../../../components/Screen/screen";
import { Card, VotePayload } from "./card";
import { useCallback } from "react";
import { Theme } from "../../../shared/theme";
import { FAB } from "../../../components/FAB/fab";
import { FeedItem } from "../../../store/feed/types/feed";
import { ShimmerCard } from "./shimmerCard";

interface RenderItem {
  item: FeedItem;
}

interface FeedScreenProps extends ViewProps {
  feed: FeedItem[];
  onRefresh(): void;
  loading?: boolean;
  onFABPress(): void;
  onVote(payload: VotePayload): void;
  onCardPress(item: FeedItem): void;
  showShimmer: boolean;
}

export const FeedScreen = ({
  feed,
  onRefresh,
  loading,
  onFABPress,
  onCardPress,
  onVote,
  showShimmer,
}: FeedScreenProps) => {
  const renderCard = useCallback(({ item }: RenderItem) => {
    return (
      <Card
        key={item.id}
        item={item}
        onClick={() => onCardPress(item)}
        onVote={onVote}
      />
    );
  }, []);
  return (
    <>
      <Screen>
        {showShimmer ? (
          <View style={styles.shimmerContainer}>
            <ShimmerCard />
            <ShimmerCard />
            <ShimmerCard />
          </View>
        ) : (
          <FlatList
            data={feed}
            renderItem={renderCard}
            style={styles.list}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={onRefresh} />
            }
          />
        )}
      </Screen>
      <FAB onPress={onFABPress} />
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: Theme.padding.P4,
    backgroundColor: Theme.color.lightGray,
  },
  shimmerContainer: {
    padding: Theme.padding.P4,
  },
});
