import { ApolloError } from "@apollo/client";
import { HttpStatusCode } from "axios";

export const getStatusCodeOfApolloError = (errors: ApolloError): number => {
  if (errors.graphQLErrors && errors.graphQLErrors.length > 0) {
    const error = errors.graphQLErrors[0];
    if (error.extensions.statusCode) {
      return error.extensions.statusCode as number;
    }
  }
  return HttpStatusCode.InternalServerError;
};
