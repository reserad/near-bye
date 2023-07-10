import React from "react";
import { Node } from "./node";
import { TreeNode } from "../utils/convertFlatArrayToTree";
import { StyleSheet, Text, View } from "react-native";

export type TreeTypes = {
  treeNodes: TreeNode[];
};
export const Tree = ({ treeNodes }: TreeTypes) => {
  return (
    <View style={styles.container}>
      {treeNodes.map(treeNode => {
        return (
          <View key={treeNode.id} style={styles.node}>
            <Text>{treeNode.body}</Text>
            <Node depth={0} children={treeNode.children} />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
  },
  node: {
    flex: 1,
  },
});
