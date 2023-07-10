import React from "react";
import { TreeNode } from "../utils/convertFlatArrayToTree";
import { StyleSheet, Text, View } from "react-native";

export type NodeTypes = {
  depth: number;
  children: TreeNode[];
};
export const Node = ({ children, depth }: NodeTypes) => {
  const styles = StyleSheet.create({
    container: {
      height: 100,
      backgroundColor: "red",
      marginLeft: depth * 10,
      padding: 5,
      marginBottom: 5,
    },
  });
  return (
    <>
      {children.map(child => (
        <View key={child.id} style={styles.container}>
          <Text>{child.body}</Text>
          <Node children={child.children} depth={depth + 1} />
        </View>
      ))}
    </>
  );
};
