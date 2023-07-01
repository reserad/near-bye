import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Theme } from "../../shared/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { IconProps } from "react-native-vector-icons/Icon";

export type FABProps = {
  color?: string;
  icon?: IconProps;
};

export const FAB = ({
  color = Theme.color.purple,
  icon = { name: "plus", size: 20, color: Theme.color.white },
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
    <TouchableOpacity activeOpacity={0.5} style={styles.container}>
      <View style={styles.button}>
        <MaterialCommunityIcons {...icon} />
      </View>
    </TouchableOpacity>
  );
};
