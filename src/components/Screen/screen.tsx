import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
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
  footer?: boolean;
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
    footer,
    ...other
  } = props;
  return (
    <SafeAreaView style={[style, styles.container]} {...other}>
      {showBackButton ? <NavBar showBackButton={showBackButton} /> : null}
      {footer ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {children}
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      ) : null}
      {scroll && !footer ? (
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
      ) : null}
      {!scroll && !footer ? <>{children}</> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
