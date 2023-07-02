import React, { useCallback, useEffect, useState } from "react";
import { FeedScreen } from "./components/feedScreen";
import { BottomTabStackProps } from "../../navigation/types";
import { useGetAllPosts } from "../posts/hooks/useGetAllPosts";
import { useNewDispatch } from "../../store/hooks/useNewDispatch";
import { setUserPosts } from "../../store/post/actions/setUserPosts";
import { useNewSelector } from "../../store/hooks/useNewSelector";
import { getUserPosts } from "./selectors/getUserPosts";

export const FeedContainer = ({ navigation }: BottomTabStackProps<"Feed">) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useNewDispatch();
  const { getAllPosts } = useGetAllPosts();
  const posts = useNewSelector(getUserPosts);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const posts = await getAllPosts();
    dispatch(setUserPosts(posts));
    setLoading(false);
  }, [getAllPosts, setLoading, dispatch, setUserPosts]);

  const handleFABPress = () => {
    navigation.navigate("MainStack", { screen: "CreatePost" });
  };

  return (
    <FeedScreen
      posts={posts}
      onRefresh={fetchPosts}
      loading={loading}
      onFABPress={handleFABPress}
    />
  );
};
