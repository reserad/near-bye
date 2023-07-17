import React, { useState } from "react";
import {
  FlatList,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Screen } from "../../../components/Screen/screen";
import { Theme } from "../../../shared/theme";
import { Asset, launchImageLibrary } from "react-native-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { uploadImage } from "../../../s3/client";
import FastImage from "react-native-fast-image";

export type CreatePostProps = {
  onSubmit(payload: CreatePostPayload): void;
};

export type CreatePostPayload = {
  body: string;
  imageUrls?: string[];
};

const getCardSize = (numberOfFiles: number) =>
  numberOfFiles === 1 ? 300 : 150;

const ImageCard = ({
  item,
  numberOfFiles,
  removeItem,
}: {
  item: Asset;
  numberOfFiles: number;
  removeItem(asset: Asset): void;
}) => {
  const cardSize = getCardSize(numberOfFiles);
  return (
    <TouchableWithoutFeedback>
      <View
        style={[
          styles.assetCardContainer,
          {
            width: cardSize + 10,
            height: cardSize + 10,
          },
        ]}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => removeItem(item)}
          style={styles.deleteAsset}>
          <MaterialCommunityIcons
            name="close"
            color={Theme.color.white}
            size={28}
          />
        </TouchableOpacity>
        <FastImage
          source={{ uri: item.uri }}
          style={[styles.imageCard, { width: cardSize, height: cardSize }]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export const CreatePostScreen = ({ onSubmit }: CreatePostProps) => {
  const [canSubmit, setCanSubmit] = useState(false);
  const [postBody, setPostBody] = useState("");
  const [selectedAssets, setSelectedAssets] = useState<Asset[]>([]);

  const handleOnTextChange = (value: string) => {
    setPostBody(value);
    if (value.length > 0) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  };

  const handleMediaPress = async () => {
    const { assets, errorMessage, didCancel } = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.8,
      maxWidth: 2048,
      maxHeight: 2048,
      selectionLimit: 4,
    });
    if (!errorMessage && !didCancel) {
      setSelectedAssets(assets);
    }
  };

  const handleOnSubmit = async () => {
    const imageUrls = await Promise.all(
      selectedAssets.map(async ({ uri, type, fileName }) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const imageUrl = (
          await uploadImage({ body: blob, fileName, type })
        ).split("?")[0];
        return imageUrl;
      }),
    );

    const payload: CreatePostPayload = {
      body: postBody,
      imageUrls,
    };
    onSubmit(payload);
  };

  const handleRemoveAsset = (asset: Asset) => {
    const newAssets = [...selectedAssets].filter(
      item => item.uri !== asset.uri,
    );
    setSelectedAssets(newAssets);
    LayoutAnimation.configureNext({
      duration: 200,
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      delete: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
    });
  };

  return (
    <Screen showBackButton style={styles.screen} footer>
      <View style={styles.container}>
        <Text style={styles.header}>Create a new post</Text>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.body}>
            <TextInput
              multiline
              value={postBody}
              maxLength={300}
              onChangeText={handleOnTextChange}
              placeholder="Start typing..."
              style={styles.input}
              scrollEnabled={false}
            />
            {selectedAssets.length > 0 ? (
              <View>
                <FlatList
                  data={selectedAssets}
                  renderItem={({ item }) => (
                    <ImageCard
                      item={item}
                      removeItem={handleRemoveAsset}
                      numberOfFiles={selectedAssets.length}
                    />
                  )}
                  horizontal
                  snapToAlignment="start"
                  decelerationRate={"fast"}
                  snapToInterval={getCardSize(selectedAssets.length) + 10}
                  nestedScrollEnabled
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={item => item.uri}
                />
              </View>
            ) : null}
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <View style={styles.media}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.card}
              onPress={handleMediaPress}>
              <MaterialCommunityIcons
                name="image"
                color={Theme.color.purple}
                size={28}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.submit}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.card}
              disabled={!canSubmit}
              onPress={handleOnSubmit}>
              <MaterialCommunityIcons
                name="send"
                color={canSubmit ? Theme.color.purple : Theme.color.mediumGray}
                size={28}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Theme.color.lightGray,
  },
  container: {
    flex: 1,
  },
  header: {
    marginBottom: Theme.padding.P3,
    textAlign: "center",
  },
  input: {
    flexGrow: 1,
    minHeight: Theme.padding.P15,
  },
  body: {
    flex: 1,
    padding: Theme.padding.P4,
    backgroundColor: Theme.color.white,
  },
  card: {
    height: Theme.padding.P15,
    width: Theme.padding.P15,
    justifyContent: "center",
    alignItems: "center",
  },
  submit: {
    alignItems: "flex-end",
    flex: 1,
  },
  media: {
    flex: 1,
  },
  createCard: {
    backgroundColor: Theme.color.purple,
  },
  footer: {
    height: Theme.padding.P15,
    flexDirection: "row",
  },
  imageCard: {
    borderRadius: Theme.padding.P3,
  },
  deleteAsset: {
    position: "absolute",
    right: Theme.padding.P3,
    top: Theme.padding.P3,
    zIndex: 1,
    backgroundColor: Theme.color.darkGray,
    borderRadius: Theme.padding.P4,
  },
  assetCardContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
