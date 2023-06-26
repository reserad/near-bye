/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type EmptyAuthPayload = {
  __typename?: 'EmptyAuthPayload';
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  sendOtp: EmptyAuthPayload;
  verifyOtp: OtpVerifyResult;
};


export type MutationSendOtpArgs = {
  otpSendInput: OtpSendInput;
};


export type MutationVerifyOtpArgs = {
  otpVerifyInput: OtpVerifyInput;
};

export type OtpSendInput = {
  phoneNumber: Scalars['String']['input'];
};

export type OtpVerifyInput = {
  code: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

export type OtpVerifyResult = {
  __typename?: 'OtpVerifyResult';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  tokenId: Scalars['String']['output'];
  user: OtpVerifyUser;
};

export type OtpVerifyUser = {
  __typename?: 'OtpVerifyUser';
  id: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  userGet: User;
};

export type User = {
  __typename?: 'User';
  baseLatitude?: Maybe<Scalars['Float']['output']>;
  baseLongitude?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
};

export type SendOtpMutationVariables = Exact<{
  otpSendInput: OtpSendInput;
}>;


export type SendOtpMutation = { __typename?: 'Mutation', sendOtp: { __typename?: 'EmptyAuthPayload', success: boolean } };

export type VerifyOtpMutationVariables = Exact<{
  otpVerifyInput: OtpVerifyInput;
}>;


export type VerifyOtpMutation = { __typename?: 'Mutation', verifyOtp: { __typename?: 'OtpVerifyResult', accessToken: string, refreshToken: string, tokenId: string, user: { __typename?: 'OtpVerifyUser', id: string, phoneNumber: string } } };

export type UserGetQueryVariables = Exact<{ [key: string]: never; }>;


export type UserGetQuery = { __typename?: 'Query', userGet: { __typename?: 'User', id: string, phoneNumber: string } };


export const SendOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"sendOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otpSendInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OtpSendInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"otpSendInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otpSendInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<SendOtpMutation, SendOtpMutationVariables>;
export const VerifyOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"verifyOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otpVerifyInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OtpVerifyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"otpVerifyInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otpVerifyInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}}]}}]}}]} as unknown as DocumentNode<VerifyOtpMutation, VerifyOtpMutationVariables>;
export const UserGetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userGet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userGet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}}]}}]} as unknown as DocumentNode<UserGetQuery, UserGetQueryVariables>;