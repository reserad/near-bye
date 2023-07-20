import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { useNewSelector } from "../../../store/hooks/useNewSelector";
import { getCurrentUser } from "../../users/selectors/getCurrentUser";
import { Theme } from "../../../shared/theme";

type ProfileButtonProps = {
  onPress(): void;
};

export const ProfileButton = ({ onPress }: ProfileButtonProps) => {
  const { profileImage } = useNewSelector(getCurrentUser);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
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
    backgroundColor: Theme.color.purple,
  },
});
