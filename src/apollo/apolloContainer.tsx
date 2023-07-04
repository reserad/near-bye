import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
} from "@apollo/client";
import { getAuthToken } from "../modules/auth/utils";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { useNewDispatch } from "../store/hooks/useNewDispatch";
import { signOut } from "../store/user/actions/signOut";
import { HttpStatusCode } from "axios";
import { resetNavigationRoot } from "../navigation/rootNavigation";

export type ApolloContainerProps = {};

export const ApolloContainer = (
  props: PropsWithChildren<ApolloContainerProps>,
) => {
  const { children } = props;
  const [client, setClient] =
    useState<ApolloClient<NormalizedCacheObject>>(null);
  const hasLoaded = useRef(false);
  const dispatch = useNewDispatch();

  const authLink = setContext(async (_, { headers }) => {
    const accessToken = await getAuthToken();
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : null,
      },
    };
  });

  const logoutLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ extensions }) => {
        if (
          extensions &&
          extensions["statusCode"] &&
          extensions["statusCode"] === HttpStatusCode.Unauthorized
        ) {
          dispatch(signOut());
          resetNavigationRoot("AuthStack");
        }
      });
    }
  });

  useEffect(() => {
    const load = async () => {
      const httpLink = createHttpLink({
        uri: process.env.REACT_APP_BFF_URL,
      });

      const apolloLink = ApolloLink.from([authLink, logoutLink, httpLink]);

      setClient(
        new ApolloClient({
          link: apolloLink,
          cache: new InMemoryCache(),
        }),
      );
      hasLoaded.current = true;
    };
    if (!hasLoaded.current) {
      load();
    }
  }, [client, logoutLink, authLink]);
  return client ? (
    <ApolloProvider client={client}>{children}</ApolloProvider>
  ) : null;
};
