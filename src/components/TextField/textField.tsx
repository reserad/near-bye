import { View, TextInput, TextInputProps, StyleSheet } from "react-native";
import { Theme } from "../../shared/theme";
import { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface TextFieldProps extends TextInputProps {
  color: string;
  badge?: IconProp;
}
export const TextField = (props: TextFieldProps) => {
  const { badge } = props;
  const [borderColor, setBorderColor] = useState(Theme.color.mediumGray);
  const handleOnFocus = useCallback(() => {
    setBorderColor(Theme.color.purple);
  }, []);

  const styles = StyleSheet.create({
    container: {
      height: Theme.input.height,
      backgroundColor: Theme.color.lightGray,
      borderRadius: Theme.padding.P3,
      marginTop: Theme.padding.P3,
      borderColor: borderColor,
      borderWidth: 1,
      flexDirection: "row",
    },
    input: {
      height: Theme.input.height,
      fontSize: Theme.fontSize.medium,
      flex: 1,
      borderRadius: Theme.padding.P3,
      marginStart: Theme.padding.P3,
    },
    label: {
      marginBottom: Theme.padding.P1,
    },
    separator: {
      width: 1,
      backgroundColor: Theme.color.mediumGray,
      height: "100%",
    },
    badgeContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    badge: {
      marginHorizontal: Theme.padding.P3,
    },
  });

  return (
    <View style={styles.container}>
      {badge ? (
        <View style={styles.badgeContainer}>
          <FontAwesomeIcon icon={badge} size={17} style={styles.badge} />
          <View style={styles.separator} />
        </View>
      ) : null}

      <TextInput
        {...props}
        style={styles.input}
        placeholderTextColor={Theme.color.black}
        onFocus={handleOnFocus}
      />
    </View>
  );
};
