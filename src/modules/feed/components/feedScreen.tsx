import { FlatList, RefreshControl, StyleSheet, ViewProps } from "react-native";
import { Screen } from "../../../components/Screen/screen";
import { Card } from "./card";
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
}

export const FeedScreen = ({
  feed,
  onRefresh,
  loading,
  onFABPress,
}: FeedScreenProps) => {
  const handleCardPress = useCallback((id: string) => {
    console.info("Card clicked: ", id);
  }, []);

  const renderCard = useCallback(({ item }: RenderItem) => {
    return (
      <Card
        key={item.id}
        item={item}
        onClick={() => handleCardPress(item.id)}
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
