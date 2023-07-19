import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewProps } from "react-native";
import { Theme } from "../../shared/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export interface FABProps extends ViewProps {
  color?: string;
  icon?: {
    name: "plus";
    size: number;
    color: string;
  };
  visible?: boolean;
  offset?: {
    x: number;
    y: number;
  };
  onPress(): void;
}

export const FAB = ({
  color = Theme.color.purple,
  icon = { name: "plus", size: 20, color: Theme.color.white },
  visible = true,
  offset = { x: 0, y: 0 },
  style,
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
      bottom: Theme.padding.P4 + offset.y,
      right: Theme.padding.P4 + offset.x,
    },
  });

  return visible ? (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.container, style]}
      onPress={onPress}>
      <View style={styles.button}>
        <MaterialCommunityIcons {...icon} />
      </View>
    </TouchableOpacity>
  ) : null;
};
