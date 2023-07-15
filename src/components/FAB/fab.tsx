import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Theme } from "../../shared/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export type FABProps = {
  color?: string;
  icon?: {
    name: "plus";
    size: number;
    color: string;
  };
  onPress(): void;
};

export const FAB = ({
  color = Theme.color.purple,
  icon = { name: "plus", size: 20, color: Theme.color.white },
  onPress,
}: FABProps) => {
  const styles = StyleSheet.create({
    button: {
      width: Theme.padding.P16,
      height: Theme.padding.P16,
      borderRadius: Theme.padding.P8,
      backgroundColor: color,
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      position: "absolute",
      justifyContent: "center",
      bottom: Theme.padding.P4,
      right: Theme.padding.P4,
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={onPress}>
      <View style={styles.button}>
        <MaterialCommunityIcons {...icon} />
      </View>
    </TouchableOpacity>
  );
};
