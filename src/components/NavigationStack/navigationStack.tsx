import React from "react";
import { AuthenticatedStack } from "./AuthenticatedNavigationStack/authenticatedNavigationStack";
import { UnauthenticatedStack } from "./UnauthenticatedNavigationStack/unauthenticatedNavigationStack";

export const MainStack = () => {
  const isAuthenticated = false;
  return isAuthenticated ? <AuthenticatedStack /> : <UnauthenticatedStack />;
};
