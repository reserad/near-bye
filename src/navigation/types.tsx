import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Login: undefined;
  Otp: { phoneNumber: string };
};

export type OtpScreenProps = NativeStackScreenProps<RootStackParamList, "Otp">;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
