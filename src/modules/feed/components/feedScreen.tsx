import { FlatList, RefreshControl, StyleSheet, ViewProps } from "react-native";
import { Screen } from "../../../components/Screen/screen";
import { Card, VotePayload } from "./card";
import { useCallback } from "react";
import { Theme } from "../../../shared/theme";
import { FAB } from "../../../components/FAB/fab";
import { FeedItem } from "../../../store/feed/types/feed";

interface RenderItem {
  item: FeedItem;
}

interface FeedScreenProps extends ViewProps {
  feed: FeedItem[];
  onRefresh(): void;
  loading?: boolean;
  onFABPress(): void;
  onVote(payload: VotePayload): void;
  onCardPress(id: string): void;
}

export const FeedScreen = ({
  feed,
  onRefresh,
  loading,
  onFABPress,
  onCardPress,
  onVote,
}: FeedScreenProps) => {
  const renderCard = useCallback(({ item }: RenderItem) => {
    return (
      <Card
        key={item.id}
        item={item}
        onClick={() => onCardPress(item.id)}
        onVote={onVote}
      />
    );
  }, []);
  return (
    <>
      <Screen>
        <FlatList
          data={feed}
          renderItem={renderCard}
          style={styles.list}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }
          onEndReached={onRefresh}
          onEndReachedThreshold={0.2}
        />
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
});
