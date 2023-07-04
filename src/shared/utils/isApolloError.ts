import { ApolloError, isApolloError as original } from "@apollo/client";

export const isApolloError = (error: unknown): error is ApolloError => {
  return error instanceof Error && original(error);
};
