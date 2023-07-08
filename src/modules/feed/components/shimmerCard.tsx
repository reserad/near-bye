import React from "react";
import { StyleSheet, View } from "react-native";
import { Theme } from "../../../shared/theme";
import LinearGradient from "react-native-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

export const ShimmerCard = () => {
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.header}>
          <ShimmerPlaceholder shimmerStyle={styles.authorPicture} />
          <ShimmerPlaceholder shimmerStyle={styles.authorAndDate} width={300} />
        </View>
        <ShimmerPlaceholder shimmerStyle={styles.bodyContainer} width={300} />
        <ShimmerPlaceholder shimmerStyle={styles.footer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: Theme.padding.P4,
  },
  card: {
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
  title: {
    fontSize: Theme.fontSize.medium,
    flex: 1,
    flexWrap: "wrap",
  },
  body: {},
  bodyContainer: {
    flex: 1,
    borderRadius: Theme.padding.P2,
    width: "100%",
  },
  authorPicture: {
    height: Theme.padding.P10,
    width: Theme.padding.P10,
    borderRadius: Theme.padding.P5,
    marginEnd: Theme.padding.P3,
  },
  author: {},
  header: {
    flexDirection: "row",
    marginBottom: Theme.padding.P3,
    alignItems: "center",
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: Theme.padding.P2,
    height: Theme.padding.P12,
    width: 150,
  },
  upvoteButton: {
    marginRight: Theme.padding.P2,
  },
  scoreContainer: {
    marginHorizontal: Theme.padding.P2,
    width: Theme.padding.P10,
    justifyContent: "center",
    alignItems: "center",
  },
  authorAndDate: {
    flex: 1,
  },
});
