import React, { useRef } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
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
  return (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.goBack()}
          style={styles.close}>
          <MaterialCommunityIcons
            name="close"
            color={Theme.color.darkGray}
            size={28}
          />
        </TouchableOpacity>
        <FlatList
          ref={flatList}
          data={uris}
          renderItem={({ item }) => <ImageItem uri={item} />}
          horizontal
          snapToAlignment="start"
          decelerationRate={"fast"}
          snapToInterval={Dimensions.get("screen").width}
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item}
          initialScrollIndex={startingIndex}
          contentContainerStyle={styles.listContainer}
          onScrollToIndexFailed={info => {
            const wait = new Promise(resolve => setTimeout(resolve, 500));
            wait.then(() => {
              flatList.current?.scrollToIndex({
                index: info.index,
                animated: true,
              });
            });
          }}
          getItemLayout={(data, index) => ({
            length: Dimensions.get("screen").width,
            offset: Dimensions.get("screen").width * index,
            index,
          })}
        />
      </View>
    </TouchableWithoutFeedback>
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
  close: {
    position: "absolute",
    width: Theme.padding.P12,
    height: Theme.padding.P12,
    top: 15,
    right: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
