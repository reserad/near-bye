import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewProps } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { IconProps } from "react-native-vector-icons/Icon";
import { Theme } from "../../../shared/theme";
import { VoteStatus } from "../../../gql/graphql";

export interface VoteButtonProps extends ViewProps {
  type: VoteButtonType;
  status: VoteStatus;
  onPress?(): void;
}

export enum VoteButtonType {
  UP = "arrow-up",
  DOWN = "arrow-down",
}

export const VoteButton = ({
  type,
  status,
  onPress,
  style,
}: VoteButtonProps) => {
  const getArrowColor = () => {
    switch (type) {
      case VoteButtonType.UP:
        if (status === VoteStatus.Upvoted) {
          return Theme.color.red;
        }
        return Theme.color.darkGray;
      case VoteButtonType.DOWN:
        if (status === VoteStatus.Downvoted) {
          return Theme.color.purple;
        }
        return Theme.color.darkGray;
      default:
        return Theme.color.darkGray;
    }
  };
  const iconProps: IconProps = {
    name: type,
    size: 20,
    color: getArrowColor(),
  };

  const styles = StyleSheet.create({
    button: {
      width: Theme.padding.P10,
      height: Theme.padding.P10,
      borderRadius: Theme.padding.P3,
      justifyContent: "center",
      alignItems: "center",
    },
    container: {},
  });

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      disabled={!!onPress}
      onPress={onPress ? onPress : null}>
      <View style={[styles.button, style]}>
        <MaterialCommunityIcons {...iconProps} />
      </View>
    </TouchableOpacity>
  );
};
