import React from "react";
import { StyleSheet, View } from "react-native";
import { Theme } from "../../../shared/theme";
import LinearGradient from "react-native-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

export const ShimmerCircle = () => {
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  return <ShimmerPlaceholder shimmerStyle={styles.circle} />;
};

const styles = StyleSheet.create({
  circle: {
    width: Theme.padding.P26,
    height: Theme.padding.P26,
    borderRadius: Theme.padding.P13,
  },
});
