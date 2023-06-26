import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { Theme } from "../../shared/theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NavBar } from "../NavBar/navBar";

export interface ScreenProps extends ViewProps {
  scroll?: boolean;
  showBackButton?: boolean;
}

export const Screen = (props: ScreenProps) => {
  const {
    children,
    style,
    scroll = false,
    showBackButton = false,
    ...other
  } = props;
  return (
    <SafeAreaView style={[style, styles.container]} {...other}>
      <NavBar showBackButton={showBackButton} />
      {scroll ? (
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled">
          {children}
        </KeyboardAwareScrollView>
      ) : (
        <>{children}</>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.color.white,
  },
});
