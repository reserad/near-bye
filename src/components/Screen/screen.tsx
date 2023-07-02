import React from "react";
import { RefreshControl, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NavBar } from "../NavBar/navBar";

export interface ScreenProps extends ViewProps {
  scroll?: boolean;
  showBackButton?: boolean;
  refresh?: boolean;
  onRefresh?(): void;
  loading?: boolean;
}

export const Screen = (props: ScreenProps) => {
  const {
    children,
    style,
    scroll = false,
    showBackButton = false,
    refresh = false,
    loading = false,
    onRefresh,
    ...other
  } = props;
  return (
    <SafeAreaView style={[style, styles.container]} {...other}>
      {showBackButton ? <NavBar showBackButton={showBackButton} /> : null}
      {scroll ? (
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            refresh ? (
              <RefreshControl refreshing={loading} onRefresh={onRefresh} />
            ) : null
          }>
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
  },
});
