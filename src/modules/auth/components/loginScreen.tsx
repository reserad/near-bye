import React, { useCallback, useState } from "react";
import { Screen } from "../../../components/Screen/screen";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import { Masks, useMaskedInputProps } from "react-native-mask-input";
import { Theme } from "../../../shared/theme";
import { TextField } from "../../../components/TextField/textField";
import { Button } from "../../../components/Button/button";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

interface LoginProps {
  onSubmit(phoneNumber: string): void;
  isLoading: boolean;
}

export const LoginScreen = (props: LoginProps) => {
  const { onSubmit, isLoading = false } = props;
  const [phoneNumber, setPhoneNumber] = useState("");

  const maskedInputProps = useMaskedInputProps({
    value: phoneNumber,
    onChangeText: (_masked, unmasked) => {
      setPhoneNumber(unmasked);
    },
    mask: Masks.USA_PHONE,
    showObfuscatedValue: true,
  });

  const handleOnPress = useCallback(async () => {
    Keyboard.dismiss();
    onSubmit(phoneNumber);
  }, [phoneNumber]);

  return (
    <Screen scroll>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.header}>Enter your phone number to begin:</Text>
          <TextField
            badge={faPhone}
            maxLength={14}
            keyboardType="phone-pad"
            color={Theme.color.black}
            placeholderTextColor={Theme.color.mediumGray}
            {...maskedInputProps}
          />
          <Button
            text="Continue"
            style={styles.submit}
            onPress={handleOnPress}
            loading={isLoading}
            disabled={phoneNumber.length !== 10}
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
