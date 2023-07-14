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

export type Comment = {
  __typename?: 'Comment';
  author: User;
  authorId: Scalars['String']['output'];
  body: Scalars['String']['output'];
  children?: Maybe<Array<Comment>>;
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  parent?: Maybe<Comment>;
  parentId?: Maybe<Scalars['String']['output']>;
};

export type CommentGetInput = {
  commentId: Scalars['String']['input'];
};

export type EmptyAuthPayload = {
  __typename?: 'EmptyAuthPayload';
  success: Scalars['Boolean']['output'];
};

export type EmptyVoteResponse = {
  __typename?: 'EmptyVoteResponse';
  success: Scalars['Boolean']['output'];
};

export type FeedGetInput = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  offset: Scalars['Float']['input'];
  take: Scalars['Float']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  postCreate: Post;
  postVote: EmptyVoteResponse;
  sendOtp: EmptyAuthPayload;
  verifyOtp: OtpVerifyResult;
};


export type MutationPostCreateArgs = {
  postCreateInput: PostCreateInput;
};


export type MutationPostVoteArgs = {
  postVoteInput: PostVoteInput;
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

export type Post = {
  __typename?: 'Post';
  author: User;
  body: Scalars['String']['output'];
  comments: Array<Comment>;
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  votes: Array<Vote>;
};

export type PostCreateInput = {
  body: Scalars['String']['input'];
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  userId: Scalars['String']['input'];
};

export type PostGetInput = {
  postId: Scalars['String']['input'];
};

export type PostVoteInput = {
  postId: Scalars['String']['input'];
  type: VoteType;
};

export type Query = {
  __typename?: 'Query';
  commentGet: Comment;
  feedGet: Array<UserPost>;
  postGet: UserPost;
  userGet: User;
};


export type QueryCommentGetArgs = {
  commentGetInput: CommentGetInput;
};


export type QueryFeedGetArgs = {
  feedGetInput: FeedGetInput;
};


export type QueryPostGetArgs = {
  postGetInput: PostGetInput;
};

export type User = {
  __typename?: 'User';
  baseLatitude?: Maybe<Scalars['Float']['output']>;
  baseLongitude?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  phoneNumber: Scalars['String']['output'];
  posts: Array<Post>;
  profileImage?: Maybe<Scalars['String']['output']>;
  votes: Array<Vote>;
};

export type UserPost = {
  __typename?: 'UserPost';
  author: User;
  authorId: Scalars['String']['output'];
  body: Scalars['String']['output'];
  comments: Array<Comment>;
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  score: Scalars['Float']['output'];
  userVoteStatus: VoteStatus;
  votes: Array<Vote>;
};

export type Vote = {
  __typename?: 'Vote';
  downvoted?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['String']['output'];
  postId: Scalars['String']['output'];
  upvoted?: Maybe<Scalars['Boolean']['output']>;
  userId: Scalars['String']['output'];
};

/** If the user voted on the post what is the state? */
export enum VoteStatus {
  Downvoted = 'DOWNVOTED',
  Neither = 'NEITHER',
  Upvoted = 'UPVOTED'
}

/** Type of vote */
export enum VoteType {
  Downvote = 'DOWNVOTE',
  Upvote = 'UPVOTE'
}

export type SendOtpMutationVariables = Exact<{
  otpSendInput: OtpSendInput;
}>;


export type SendOtpMutation = { __typename?: 'Mutation', sendOtp: { __typename?: 'EmptyAuthPayload', success: boolean } };

export type VerifyOtpMutationVariables = Exact<{
  otpVerifyInput: OtpVerifyInput;
}>;


export type VerifyOtpMutation = { __typename?: 'Mutation', verifyOtp: { __typename?: 'OtpVerifyResult', accessToken: string, refreshToken: string, tokenId: string, user: { __typename?: 'OtpVerifyUser', id: string, phoneNumber: string } } };

export type CommentGetQueryVariables = Exact<{
  commentGetInput: CommentGetInput;
}>;


export type CommentGetQuery = { __typename?: 'Query', commentGet: { __typename: 'Comment', id: string, body: string, createdAt: string, parentId?: string | null, author: { __typename: 'User', id: string, profileImage?: string | null, name?: string | null, createdAt: string, phoneNumber: string }, parent?: { __typename: 'Comment', id: string, createdAt: string, parentId?: string | null, body: string, author: { __typename: 'User', id: string, profileImage?: string | null, name?: string | null, createdAt: string, phoneNumber: string } } | null, children?: Array<{ __typename: 'Comment', id: string, body: string, createdAt: string, parentId?: string | null, author: { __typename: 'User', id: string, profileImage?: string | null, name?: string | null, createdAt: string, phoneNumber: string }, children?: Array<{ __typename: 'Comment', id: string, body: string, createdAt: string, author: { __typename: 'User', id: string, profileImage?: string | null, name?: string | null, createdAt: string, phoneNumber: string } }> | null }> | null } };

export type FeedGetQueryVariables = Exact<{
  feedGetInput: FeedGetInput;
}>;


export type FeedGetQuery = { __typename?: 'Query', feedGet: Array<{ __typename: 'UserPost', id: string, body: string, createdAt: string, userVoteStatus: VoteStatus, score: number, author: { __typename: 'User', id: string, name?: string | null, profileImage?: string | null, createdAt: string, phoneNumber: string }, comments: Array<{ __typename: 'Comment', id: string, body: string, createdAt: string, parentId?: string | null, author: { __typename: 'User', id: string, profileImage?: string | null, name?: string | null, createdAt: string, phoneNumber: string }, children?: Array<{ __typename?: 'Comment', id: string }> | null }> }> };

export type PostCreateMutationVariables = Exact<{
  postCreateInput: PostCreateInput;
}>;


export type PostCreateMutation = { __typename?: 'Mutation', postCreate: { __typename: 'Post', id: string, body: string, createdAt: string, latitude?: number | null, longitude?: number | null, author: { __typename: 'User', id: string, profileImage?: string | null, createdAt: string, name?: string | null } } };

export type PostGetQueryVariables = Exact<{
  postGetInput: PostGetInput;
}>;


export type PostGetQuery = { __typename?: 'Query', postGet: { __typename: 'UserPost', id: string, body: string, createdAt: string, userVoteStatus: VoteStatus, score: number, author: { __typename: 'User', id: string, name?: string | null, profileImage?: string | null, createdAt: string, phoneNumber: string }, comments: Array<{ __typename: 'Comment', body: string, createdAt: string, id: string, parentId?: string | null, author: { __typename: 'User', id: string, profileImage?: string | null, name?: string | null, createdAt: string, phoneNumber: string }, parent?: { __typename: 'Comment', id: string, parentId?: string | null, body: string, createdAt: string, author: { __typename: 'User', id: string, name?: string | null, profileImage?: string | null, createdAt: string, phoneNumber: string } } | null, children?: Array<{ __typename: 'Comment', id: string, body: string, createdAt: string, parentId?: string | null, author: { __typename: 'User', id: string, profileImage?: string | null, name?: string | null, createdAt: string, phoneNumber: string } }> | null }> } };

export type PostVoteMutationVariables = Exact<{
  postVoteInput: PostVoteInput;
}>;


export type PostVoteMutation = { __typename?: 'Mutation', postVote: { __typename: 'EmptyVoteResponse', success: boolean } };

export type UserGetQueryVariables = Exact<{ [key: string]: never; }>;


export type UserGetQuery = { __typename?: 'Query', userGet: { __typename: 'User', id: string, name?: string | null, createdAt: string, phoneNumber: string, profileImage?: string | null } };


export const SendOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"sendOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otpSendInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OtpSendInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"otpSendInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otpSendInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<SendOtpMutation, SendOtpMutationVariables>;
export const VerifyOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"verifyOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otpVerifyInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OtpVerifyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"otpVerifyInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otpVerifyInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}}]}}]}}]} as unknown as DocumentNode<VerifyOtpMutation, VerifyOtpMutationVariables>;
export const CommentGetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"commentGet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentGetInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CommentGetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commentGet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentGetInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentGetInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}}]}}]}}]}}]} as unknown as DocumentNode<CommentGetQuery, CommentGetQueryVariables>;
export const FeedGetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"feedGet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"feedGetInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FeedGetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"feedGet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"feedGetInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"feedGetInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"userVoteStatus"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FeedGetQuery, FeedGetQueryVariables>;
export const PostCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"postCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postCreateInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PostCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postCreateInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postCreateInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<PostCreateMutation, PostCreateMutationVariables>;
export const PostGetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"postGet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postGetInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PostGetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postGet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postGetInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postGetInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"userVoteStatus"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}}]}}]} as unknown as DocumentNode<PostGetQuery, PostGetQueryVariables>;
export const PostVoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"postVote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postVoteInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PostVoteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postVote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postVoteInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postVoteInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<PostVoteMutation, PostVoteMutationVariables>;
export const UserGetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userGet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userGet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"profileImage"}}]}}]}}]} as unknown as DocumentNode<UserGetQuery, UserGetQueryVariables>;