import React, { useCallback } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { useNewSelector } from "../../../store/hooks/useNewSelector";
import { getCurrentUser } from "../../users/selectors/getCurrentUser";
import { Theme } from "../../../shared/theme";
import { useNavigation } from "@react-navigation/native";

export const ProfileButton = () => {
  const navigation = useNavigation();
  const { profileImage } = useNewSelector(getCurrentUser);
  const handleButtonPress = useCallback(() => {}, [navigation]);
  return (
    <TouchableOpacity style={styles.container} onPress={handleButtonPress}>
      <FastImage
        source={{
          uri: profileImage,
        }}
        style={styles.container}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Theme.padding.P10,
    height: Theme.padding.P10,
    borderRadius: Theme.padding.P8,
  },
});
