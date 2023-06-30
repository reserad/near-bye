import React, { useCallback, useState } from "react";
import { Screen } from "../../../components/Screen/screen";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import { Theme } from "../../../shared/theme";
import { TextField } from "../../../components/TextField/textField";
import { Button } from "../../../components/Button/button";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

interface VerifyOtpProps {
  onSubmit(code: string): void;
  isLoading: boolean;
}

export const VerifyOtpScreen = (props: VerifyOtpProps) => {
  const { onSubmit, isLoading = false } = props;
  const [code, setCode] = useState("");

  const handleOnPress = useCallback(async () => {
    Keyboard.dismiss();
    onSubmit(code);
  }, [code]);

  return (
    <Screen scroll showBackButton>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.header}>Enter the code:</Text>
          <TextField
            badge={faPhone}
            maxLength={6}
            keyboardType="number-pad"
            color={Theme.color.black}
            placeholderTextColor={Theme.color.mediumGray}
            value={code}
            onChangeText={value => setCode(value)}
          />
          <Button
            text="Continue"
            style={styles.submit}
            onPress={handleOnPress}
            loading={isLoading}
            disabled={code.length !== 6}
          />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.padding.P4,
    flexDirection: "row",
  },
  phoneNumberInput: {
    height: 54,
    borderWidth: 1,
    fontSize: 18,
    paddingHorizontal: 12,
    borderRadius: 6,
    color: Theme.color.white,
  },
  phoneNumberLabel: {
    marginTop: 10,
  },
  card: {
    height: 300,
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: Theme.fontSize.large,
    fontWeight: "bold",
    color: Theme.color.darkGray,
  },
  submit: {
    marginTop: Theme.padding.P4,
  },
});
