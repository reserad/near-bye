import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  MainStack: NavigatorScreenParams<MainStackParamList>;
};

export type MainStackParamList = {
  CreatePost: undefined;
  Post: { postId: string };
  BottomTabs: NavigatorScreenParams<BottomTabStackParamList>;
  Comment: { commentId: string; postId: string };
  Media: { uris: string[]; startingIndex: number };
  Account: undefined;
};

export type BottomTabStackParamList = {
  Feed: undefined;
};

export type AuthStackParamList = {
  SendOtp: undefined;
  VerifyOtp: { phoneNumber: string };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;

export type AuthStackProps<T extends keyof AuthStackParamList> =
  CompositeScreenProps<
    StackScreenProps<AuthStackParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type MainStackProps<T extends keyof MainStackParamList> =
  CompositeScreenProps<
    StackScreenProps<MainStackParamList, T>,
    NativeStackScreenProps<RootStackParamList, "MainStack", T>
  >;

export type BottomTabStackProps<T extends keyof BottomTabStackParamList> =
  CompositeScreenProps<
    StackScreenProps<BottomTabStackParamList, T>,
    NativeStackScreenProps<RootStackParamList, "MainStack", T>
  >;

export type MainStackProps2 = StackNavigationProp<
  RootStackParamList,
  "MainStack"
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
