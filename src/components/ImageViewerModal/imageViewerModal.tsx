import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewToken,
  ViewabilityConfigCallbackPair,
} from "react-native";
import { Theme } from "../../shared/theme";
import { MainStackProps } from "../../navigation/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FastImage from "react-native-fast-image";

const ImageItem = ({ uri }: { uri: string }) => {
  const imageWidth = Dimensions.get("screen").width;
  return (
    <TouchableWithoutFeedback>
      <View>
        <FastImage
          source={{
            uri,
          }}
          style={{ width: imageWidth, height: imageWidth * (3 / 4) }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export const ImageViewerModal = ({
  navigation,
  route,
}: MainStackProps<"Media">) => {
  const { uris, startingIndex } = route.params;
  const flatList = useRef<FlatList>(null);
  const [index, setIndex] = useState(() => startingIndex);

  const onViewableItemsChanged = ({ changed }: { changed: ViewToken[] }) => {
    if (changed && changed[0]) {
      setIndex(changed[0].index);
    }
  };
  const viewabilityConfigCallbackPairs = useRef<
    ViewabilityConfigCallbackPair[]
  >([
    {
      viewabilityConfig: { viewAreaCoveragePercentThreshold: 50 },
      onViewableItemsChanged,
    },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.goBack()}
          style={styles.close}>
          <MaterialCommunityIcons
            name="arrow-left"
            color={Theme.color.darkGray}
            size={28}
          />
        </TouchableOpacity>
        <View style={styles.imagePositionCounter}>
          <Text>
            {index + 1} / {uris.length}
          </Text>
        </View>
      </View>

      <FlatList
        ref={flatList}
        data={uris}
        renderItem={({ item }) => <ImageItem key={item} uri={item} />}
        horizontal
        snapToAlignment="start"
        decelerationRate={"fast"}
        snapToInterval={Dimensions.get("screen").width}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item}
        initialScrollIndex={startingIndex}
        contentContainerStyle={styles.listContainer}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            flatList.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          });
        }}
        getItemLayout={(_data, index) => ({
          length: Dimensions.get("screen").width,
          offset: Dimensions.get("screen").width * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.color.lightGray,
  },
  listContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    position: "absolute",
    top: Theme.padding.P4,
    left: Theme.padding.P4,
    flexDirection: "row",
    zIndex: 1,
    elevation: 1,
  },
  close: {
    width: Theme.padding.P12,
    height: Theme.padding.P12,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePositionCounter: {
    height: Theme.padding.P12,
    width: Theme.padding.P12,
    justifyContent: "center",
    alignItems: "center",
  },
});
