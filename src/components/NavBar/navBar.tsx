import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Theme } from "../../shared/theme";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export interface NavBarProps {
  showBackButton: boolean;
}
export const NavBar = (props: NavBarProps) => {
  const { showBackButton } = props;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {showBackButton ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.backButton}>
            <FontAwesomeIcon icon={faArrowLeft} size={22} />
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Theme.padding.P13,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    height: Theme.padding.P13,
    width: Theme.padding.P13,
    borderRadius: Theme.padding.P13,
    justifyContent: "center",
    alignItems: "center",
  },
});
