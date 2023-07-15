/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation sendOtp($otpSendInput: OtpSendInput!) {\n  sendOtp(otpSendInput: $otpSendInput) {\n    success\n  }\n}": types.SendOtpDocument,
    "mutation verifyOtp($otpVerifyInput: OtpVerifyInput!) {\n  verifyOtp(otpVerifyInput: $otpVerifyInput) {\n    accessToken\n    refreshToken\n    tokenId\n    user {\n      id\n      phoneNumber\n    }\n  }\n}": types.VerifyOtpDocument,
    "query commentGet($commentGetInput: CommentGetInput!) {\n  commentGet(commentGetInput: $commentGetInput) {\n    __typename\n    id\n    body\n    createdAt\n    author {\n      __typename\n      id\n      profileImage\n      name\n      createdAt\n      phoneNumber\n    }\n    parentId\n    parent {\n      __typename\n      id\n      createdAt\n      parentId\n      body\n      author {\n        __typename\n        id\n        profileImage\n        name\n        createdAt\n        phoneNumber\n      }\n    }\n    children {\n      __typename\n      id\n      body\n      createdAt\n      author {\n        __typename\n        id\n        profileImage\n        name\n        createdAt\n        phoneNumber\n      }\n      children {\n        __typename\n        id\n        body\n        createdAt\n        author {\n          __typename\n          id\n          profileImage\n          name\n          createdAt\n          phoneNumber\n        }\n      }\n      parentId\n    }\n  }\n}": types.CommentGetDocument,
    "query feedGet($feedGetInput: FeedGetInput!) {\n  feedGet(feedGetInput: $feedGetInput) {\n    __typename\n    id\n    body\n    createdAt\n    userVoteStatus\n    score\n    author {\n      __typename\n      id\n      name\n      profileImage\n      createdAt\n      phoneNumber\n    }\n    comments {\n      __typename\n      id\n      body\n      createdAt\n      author {\n        __typename\n        id\n        profileImage\n        name\n        createdAt\n        phoneNumber\n      }\n      parentId\n      children {\n        id\n      }\n    }\n  }\n}": types.FeedGetDocument,
    "mutation postCreate($postCreateInput: PostCreateInput!) {\n  postCreate(postCreateInput: $postCreateInput) {\n    __typename\n    id\n    body\n    createdAt\n    latitude\n    longitude\n    author {\n      __typename\n      id\n      profileImage\n      createdAt\n      name\n      phoneNumber\n    }\n  }\n}": types.PostCreateDocument,
    "query postGet($postGetInput: PostGetInput!) {\n  postGet(postGetInput: $postGetInput) {\n    __typename\n    id\n    body\n    createdAt\n    userVoteStatus\n    author {\n      __typename\n      id\n      name\n      profileImage\n      createdAt\n      phoneNumber\n    }\n    comments {\n      __typename\n      author {\n        __typename\n        id\n        profileImage\n        name\n        createdAt\n        phoneNumber\n      }\n      body\n      createdAt\n      id\n      parentId\n      parent {\n        __typename\n        id\n        parentId\n        body\n        author {\n          __typename\n          id\n          name\n          profileImage\n          createdAt\n          phoneNumber\n        }\n        createdAt\n        id\n      }\n      children {\n        __typename\n        id\n        body\n        createdAt\n        author {\n          __typename\n          id\n          profileImage\n          name\n          createdAt\n          phoneNumber\n        }\n        parentId\n      }\n    }\n    score\n  }\n}": types.PostGetDocument,
    "mutation postVote($postVoteInput: PostVoteInput!) {\n  postVote(postVoteInput: $postVoteInput) {\n    __typename\n    success\n  }\n}": types.PostVoteDocument,
    "query userGet {\n  userGet {\n    __typename\n    id\n    name\n    createdAt\n    phoneNumber\n    profileImage\n    baseLatitude\n    baseLongitude\n  }\n}": types.UserGetDocument,
    "mutation userUpdate($userUpdateInput: UserUpdateInput!) {\n  userUpdate(userUpdateInput: $userUpdateInput) {\n    __typename\n    id\n    name\n    createdAt\n    phoneNumber\n    profileImage\n  }\n}": types.UserUpdateDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation sendOtp($otpSendInput: OtpSendInput!) {\n  sendOtp(otpSendInput: $otpSendInput) {\n    success\n  }\n}"): (typeof documents)["mutation sendOtp($otpSendInput: OtpSendInput!) {\n  sendOtp(otpSendInput: $otpSendInput) {\n    success\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation verifyOtp($otpVerifyInput: OtpVerifyInput!) {\n  verifyOtp(otpVerifyInput: $otpVerifyInput) {\n    accessToken\n    refreshToken\n    tokenId\n    user {\n      id\n      phoneNumber\n    }\n  }\n}"): (typeof documents)["mutation verifyOtp($otpVerifyInput: OtpVerifyInput!) {\n  verifyOtp(otpVerifyInput: $otpVerifyInput) {\n    accessToken\n    refreshToken\n    tokenId\n    user {\n      id\n      phoneNumber\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query commentGet($commentGetInput: CommentGetInput!) {\n  commentGet(commentGetInput: $commentGetInput) {\n    __typename\n    id\n    body\n    createdAt\n    author {\n      __typename\n      id\n      profileImage\n      name\n      createdAt\n      phoneNumber\n    }\n    parentId\n    parent {\n      __typename\n      id\n      createdAt\n      parentId\n      body\n      author {\n        __typename\n        id\n        profileImage\n        name\n        createdAt\n        phoneNumber\n      }\n    }\n    children {\n      __typename\n      id\n      body\n      createdAt\n      author {\n        __typename\n        id\n        profileImage\n        name\n        createdAt\n        phoneNumber\n      }\n      children {\n        __typename\n        id\n        body\n        createdAt\n        author {\n          __typename\n          id\n          profileImage\n          name\n          createdAt\n          phoneNumber\n        }\n      }\n      parentId\n    }\n  }\n}"): (typeof documents)["query commentGet($commentGetInput: CommentGetInput!) {\n  commentGet(commentGetInput: $commentGetInput) {\n    __typename\n    id\n    body\n    createdAt\n    author {\n      __typename\n      id\n      profileImage\n      name\n      createdAt\n      phoneNumber\n    }\n    parentId\n    parent {\n      __typename\n      id\n      createdAt\n      parentId\n      body\n      author {\n        __typename\n        id\n        profileImage\n        name\n        createdAt\n        phoneNumber\n      }\n    }\n    children {\n      __typename\n      id\n      body\n      createdAt\n      author {\n        __typename\n        id\n        profileImage\n        name\n        createdAt\n        phoneNumber\n      }\n      children {\n        __typename\n        id\n        body\n        createdAt\n        author {\n          __typename\n          id\n          profileImage\n          name\n          createdAt\n          phoneNumber\n        }\n      }\n      parentId\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query feedGet($feedGetInput: FeedGetInput!) {\n  feedGet(feedGetInput: $feedGetInput) {\n    __typename\n    id\n    body\n    createdAt\n    userVoteStatus\n    score\n    author {\n      __typename\n      id\n      name\n      profileImage\n      createdAt\n      phoneNumber\n    }\n    comments {\n      __typename\n      id\n      body\n      createdAt\n      author {\n        __typename\n        id\n        profileImage\n        name\n        createdAt\n        phoneNumber\n      }\n      parentId\n      children {\n        id\n      }\n    }\n  }\n}"): (typeof documents)["query feedGet($feedGetInput: FeedGetInput!) {\n  feedGet(feedGetInput: $feedGetInput) {\n    __typename\n    id\n    body\n    createdAt\n    userVoteStatus\n    score\n    author {\n      __typename\n      id\n      name\n      profileImage\n      createdAt\n      phoneNumber\n    }\n    comments {\n      __typename\n      id\n      body\n      createdAt\n      author {\n        __typename\n        id\n        profileImage\n        name\n        createdAt\n        phoneNumber\n      }\n      parentId\n      children {\n        id\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation postCreate($postCreateInput: PostCreateInput!) {\n  postCreate(postCreateInput: $postCreateInput) {\n    __typename\n    id\n    body\n    createdAt\n    latitude\n    longitude\n    author {\n      __typename\n      id\n      profileImage\n      createdAt\n      name\n      phoneNumber\n    }\n  }\n}"): (typeof documents)["mutation postCreate($postCreateInput: PostCreateInput!) {\n  postCreate(postCreateInput: $postCreateInput) {\n    __typename\n    id\n    body\n    createdAt\n    latitude\n    longitude\n    author {\n      __typename\n      id\n      profileImage\n      createdAt\n      name\n      phoneNumber\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query postGet($postGetInput: PostGetInput!) {\n  postGet(postGetInput: $postGetInput) {\n    __typename\n    id\n    body\n    createdAt\n    userVoteStatus\n    author {\n      __typename\n      id\n      name\n      profileImage\n      createdAt\n      phoneNumber\n    }\n    comments {\n      __typename\n      author {\n        __typename\n        id\n        profileImage\n        name\n        createdAt\n        phoneNumber\n      }\n      body\n      createdAt\n      id\n      parentId\n      parent {\n        __typename\n        id\n        parentId\n        body\n        author {\n          __typename\n          id\n          name\n          profileImage\n          createdAt\n          phoneNumber\n        }\n        createdAt\n        id\n      }\n      children {\n        __typename\n        id\n        body\n        createdAt\n        author {\n          __typename\n          id\n          profileImage\n          name\n          createdAt\n          phoneNumber\n        }\n        parentId\n      }\n    }\n    score\n  }\n}"): (typeof documents)["query postGet($postGetInput: PostGetInput!) {\n  postGet(postGetInput: $postGetInput) {\n    __typename\n    id\n    body\n    createdAt\n    userVoteStatus\n    author {\n      __typename\n      id\n      name\n      profileImage\n      createdAt\n      phoneNumber\n    }\n    comments {\n      __typename\n      author {\n        __typename\n        id\n        profileImage\n        name\n        createdAt\n        phoneNumber\n      }\n      body\n      createdAt\n      id\n      parentId\n      parent {\n        __typename\n        id\n        parentId\n        body\n        author {\n          __typename\n          id\n          name\n          profileImage\n          createdAt\n          phoneNumber\n        }\n        createdAt\n        id\n      }\n      children {\n        __typename\n        id\n        body\n        createdAt\n        author {\n          __typename\n          id\n          profileImage\n          name\n          createdAt\n          phoneNumber\n        }\n        parentId\n      }\n    }\n    score\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation postVote($postVoteInput: PostVoteInput!) {\n  postVote(postVoteInput: $postVoteInput) {\n    __typename\n    success\n  }\n}"): (typeof documents)["mutation postVote($postVoteInput: PostVoteInput!) {\n  postVote(postVoteInput: $postVoteInput) {\n    __typename\n    success\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query userGet {\n  userGet {\n    __typename\n    id\n    name\n    createdAt\n    phoneNumber\n    profileImage\n    baseLatitude\n    baseLongitude\n  }\n}"): (typeof documents)["query userGet {\n  userGet {\n    __typename\n    id\n    name\n    createdAt\n    phoneNumber\n    profileImage\n    baseLatitude\n    baseLongitude\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation userUpdate($userUpdateInput: UserUpdateInput!) {\n  userUpdate(userUpdateInput: $userUpdateInput) {\n    __typename\n    id\n    name\n    createdAt\n    phoneNumber\n    profileImage\n  }\n}"): (typeof documents)["mutation userUpdate($userUpdateInput: UserUpdateInput!) {\n  userUpdate(userUpdateInput: $userUpdateInput) {\n    __typename\n    id\n    name\n    createdAt\n    phoneNumber\n    profileImage\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;