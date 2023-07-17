import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreenProps } from "@react-navigation/stack";

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
};

export type BottomTabStackParamList = {
  Feed: undefined;
  Account: undefined;
};

export type AuthStackParamList = {
  SendOtp: undefined;
  VerifyOtp: { phoneNumber: string };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type AuthStackProps<T extends keyof AuthStackParamList> =
  CompositeScreenProps<
    StackScreenProps<AuthStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type MainStackProps<T extends keyof MainStackParamList> =
  CompositeScreenProps<
    StackScreenProps<MainStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type BottomTabStackProps<T extends keyof BottomTabStackParamList> =
  CompositeScreenProps<
    StackScreenProps<BottomTabStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;
