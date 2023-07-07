import React, { useCallback, useEffect, useState } from "react";
import { FeedScreen } from "./components/feedScreen";
import { BottomTabStackProps } from "../../navigation/types";
import { useGetFeed } from "./hooks/useGetFeed";
import { useNewDispatch } from "../../store/hooks/useNewDispatch";
import { useNewSelector } from "../../store/hooks/useNewSelector";
import { getUserFeed } from "./selectors/getUserFeed";
import { setFeed } from "../../store/feed/actions/setFeed";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export const FeedContainer = ({ navigation }: BottomTabStackProps<"Feed">) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useNewDispatch();
  const { getFeed } = useGetFeed();
  const userFeed = useNewSelector(getUserFeed);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = useCallback(async () => {
    setLoading(true);
    try {
      const feed = await getFeed({ offset });
      dispatch(setFeed(feed));
      setOffset(feed.length);
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  }, [getFeed, setLoading, dispatch, setFeed, setOffset]);

  const handleFABPress = useCallback(() => {
    navigation.navigate("MainStack", { screen: "CreatePost" });
  }, [navigation]);

  return (
    <FeedScreen
      feed={userFeed}
      onRefresh={fetchFeed}
      loading={loading}
      onFABPress={handleFABPress}
    />
  );
};
