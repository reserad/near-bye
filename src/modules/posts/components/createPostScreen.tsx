import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Screen } from "../../../components/Screen/screen";
import { Theme } from "../../../shared/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Button } from "../../../components/Button/button";

export type CreatePostProps = {
  onSubmit(payload: CreatePostPayload): void;
};

export type CreatePostPayload = {
  body: string;
};

export const CreatePostScreen = ({ onSubmit }: CreatePostProps) => {
  const [canSubmit, setCanSubmit] = useState(false);
  const [postBody, setPostBody] = useState("");

  const handleOnTextChange = (value: string) => {
    setPostBody(value);
    if (value.length > 0) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  };

  const handleOnSubmit = () => {
    const payload: CreatePostPayload = {
      body: postBody,
    };
    onSubmit(payload);
  };
  return (
    <Screen scroll showBackButton style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.header}>Create a new post</Text>
        <View style={styles.body}>
          <TextInput
            multiline
            value={postBody}
            maxLength={300}
            onChangeText={handleOnTextChange}
            placeholder="Start typing..."
            style={styles.input}
          />
        </View>
        <View style={styles.actionBar}>
          <View style={styles.mediaContainer}>
            <TouchableOpacity activeOpacity={0.6}>
              <View style={[styles.card, styles.uploadCard]}>
                <MaterialCommunityIcons
                  name="image"
                  color={Theme.color.white}
                  size={28}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6}>
              <View style={[styles.card, styles.mediaCard]}>
                <MaterialCommunityIcons
                  name="image"
                  color={Theme.color.mediumGray}
                  size={28}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6}>
              <View style={[styles.card, styles.mediaCard]}>
                <MaterialCommunityIcons
                  name="image"
                  color={Theme.color.mediumGray}
                  size={28}
                />
              </View>
            </TouchableOpacity>
          </View>
          <Button
            icon={
              <MaterialCommunityIcons
                name="send"
                color={Theme.color.white}
                size={28}
              />
            }
            onPress={handleOnSubmit}
            style={[
              styles.card,
              canSubmit ? styles.createCard : styles.createCardDisabled,
            ]}
            disabled={!canSubmit}
            height={Theme.padding.P16}
          />
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
    padding: Theme.padding.P4,
  },
  header: {
    fontSize: Theme.fontSize.medium,
    marginBottom: Theme.padding.P2,
  },
  input: {
    flex: 1,
  },
  body: {
    height: 250,
    padding: Theme.padding.P4,
    borderRadius: Theme.padding.P2,
    marginBottom: Theme.padding.P5,
    backgroundColor: Theme.color.white,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  card: {
    height: Theme.padding.P16,
    width: Theme.padding.P16,
    borderRadius: Theme.padding.P8,
    justifyContent: "center",
    alignItems: "center",
  },
  mediaCard: {
    backgroundColor: Theme.color.white,
    borderColor: Theme.color.mediumGray,
    borderWidth: 1,
    marginHorizontal: Theme.padding.P1,
  },
  uploadCard: {
    backgroundColor: Theme.color.purple,
    marginEnd: Theme.padding.P1,
  },
  mediaContainer: {
    flex: 1,
    flexDirection: "row",
  },
  actionBar: {
    flexDirection: "row",
  },
  createCard: {
    backgroundColor: Theme.color.purple,
  },
  createCardDisabled: {
    backgroundColor: Theme.color.purpleDesaturated,
  },
});
