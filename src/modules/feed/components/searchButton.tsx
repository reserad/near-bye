import React, { useCallback } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Theme } from "../../../shared/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const SearchButton = () => {
  const handleButtonPress = useCallback(() => {}, []);
  return (
    <TouchableOpacity style={styles.container} onPress={handleButtonPress}>
      <View style={[styles.container, { flex: 1 }]}>
        <MaterialCommunityIcons
          name="magnify"
          color={Theme.color.darkGray}
          size={25}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Theme.padding.P10,
    height: Theme.padding.P10,
    borderRadius: Theme.padding.P8,
    justifyContent: "center",
    alignItems: "center",
  },
});
