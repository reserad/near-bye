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

export type PostGetAllInput = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
};

export type Proifle = {
  __typename?: 'Proifle';
  bio?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  profileImage?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  postGetAll: Array<UserPost>;
  userGet: User;
};


export type QueryPostGetAllArgs = {
  postGetAllInput: PostGetAllInput;
};

export type User = {
  __typename?: 'User';
  baseLatitude?: Maybe<Scalars['Float']['output']>;
  baseLongitude?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  profile: Proifle;
};

export type UserPost = {
  __typename?: 'UserPost';
  author: User;
  body: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
};

export type PostGetAllQueryVariables = Exact<{
  postGetAllInput: PostGetAllInput;
}>;


export type PostGetAllQuery = { __typename?: 'Query', postGetAll: Array<{ __typename?: 'UserPost', id: string, body: string, createdAt: string, author: { __typename?: 'User', phoneNumber: string, profile: { __typename?: 'Proifle', id: string, profileImage?: string | null } } }> };

export type UserGetQueryVariables = Exact<{ [key: string]: never; }>;


export type UserGetQuery = { __typename?: 'Query', userGet: { __typename?: 'User', id: string, phoneNumber: string } };


export const PostGetAllDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"postGetAll"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postGetAllInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PostGetAllInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postGetAll"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postGetAllInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postGetAllInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PostGetAllQuery, PostGetAllQueryVariables>;
export const UserGetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userGet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userGet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}}]}}]} as unknown as DocumentNode<UserGetQuery, UserGetQueryVariables>;