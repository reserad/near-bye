import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
} from "@apollo/client";
import { getAuthHeaders } from "../modules/auth/utils";

export type ApolloContainerProps = {};

export const ApolloContainer = (
  props: PropsWithChildren<ApolloContainerProps>,
) => {
  const { children } = props;
  const [client, setClient] =
    useState<ApolloClient<NormalizedCacheObject>>(null);
  const hasLoaded = useRef(false);

  useEffect(() => {
    const load = async () => {
      const headers = await getAuthHeaders();
      const httpLink = createHttpLink({
        uri: process.env.REACT_APP_BFF_URL,
        headers,
      });

      setClient(
        new ApolloClient({
          link: httpLink,
          cache: new InMemoryCache(),
        }),
      );
      hasLoaded.current = true;
    };
    if (!hasLoaded.current) {
      load();
    }
  }, [client]);
  return client ? (
    <ApolloProvider client={client}>{children}</ApolloProvider>
  ) : null;
};
