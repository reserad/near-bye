import React from "react";
import { BaseToast, ErrorToast } from "react-native-toast-message";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { Theme } from "../../shared/theme";

export const RootToast = () => {
  return (
    <Toast
      config={{
        success: props => (
          <BaseToast
            {...props}
            style={{ borderLeftColor: "pink" }}
            contentContainerStyle={{ paddingHorizontal: Theme.padding.P4 }}
            text1Style={{
              fontSize: Theme.fontSize.medium,
              fontWeight: "400",
            }}
          />
        ),
        error: props => (
          <ErrorToast
            {...props}
            text1Style={{
              fontSize: Theme.fontSize.medium,
            }}
            text2Style={{
              fontSize: Theme.fontSize.small,
            }}
          />
        ),
      }}
    />
  );
};
