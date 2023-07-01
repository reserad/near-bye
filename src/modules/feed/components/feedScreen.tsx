import { FlatList, RefreshControl, StyleSheet, ViewProps } from "react-native";
import { Screen } from "../../../components/Screen/screen";
import { Card } from "./card";
import { useCallback } from "react";
import { Theme } from "../../../shared/theme";
import { Post } from "../../../store/post/types/post";
import { FAB } from "../../../components/FAB/fab";

interface RenderItem {
  item: Post;
}

interface FeedScreenProps extends ViewProps {
  posts: Post[];
  onRefresh(): void;
  loading?: boolean;
}

export const FeedScreen = ({ posts, onRefresh, loading }: FeedScreenProps) => {
  const handleOnClick = useCallback((id: string) => {
    console.info("Card clicked: ", id);
  }, []);

  const renderCard = useCallback(({ item }: RenderItem) => {
    return (
      <Card key={item.id} post={item} onClick={() => handleOnClick(item.id)} />
    );
  }, []);
  return (
    <>
      <Screen>
        <FlatList
          data={posts}
          renderItem={renderCard}
          style={styles.list}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }
        />
      </Screen>
      <FAB />
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: Theme.padding.P4,
    backgroundColor: Theme.color.lightGray,
  },
});
