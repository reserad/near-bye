import React from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";
import { Theme } from "../../../shared/theme";

export const FeedHeader = ({ style }: ViewProps) => {
  return (
    <View style={[styles.listHeader, style]}>
      <Text style={styles.listHeaderText}>What's happening near you</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  listHeader: {
    marginVertical: Theme.padding.P4,
    height: Theme.padding.P12,
    justifyContent: "center",
  },
  listHeaderText: {
    textAlign: "center",
  },
});
