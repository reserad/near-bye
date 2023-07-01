import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
} from "@apollo/client";
import { getAuthToken } from "../modules/auth/utils";
import { setContext } from "@apollo/client/link/context";

export type ApolloContainerProps = {};

export const ApolloContainer = (
  props: PropsWithChildren<ApolloContainerProps>,
) => {
  const { children } = props;
  const [client, setClient] =
    useState<ApolloClient<NormalizedCacheObject>>(null);
  const hasLoaded = useRef(false);

  const apolloAuthContext = setContext(async (_, { headers }) => {
    const accessToken = await getAuthToken();
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : null,
      },
    };
  });

  useEffect(() => {
    const load = async () => {
      const httpLink = createHttpLink({
        uri: process.env.REACT_APP_BFF_URL,
      });

      setClient(
        new ApolloClient({
          link: apolloAuthContext.concat(httpLink),
          cache: new InMemoryCache(),
        }),
      );
      hasLoaded.current = true;
    };
    if (!hasLoaded.current) {
      load();
    }
  }, [client, apolloAuthContext]);
  return client ? (
    <ApolloProvider client={client}>{children}</ApolloProvider>
  ) : null;
};
