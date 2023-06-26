import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";

import { Provider } from "react-redux";
import { store, persistor } from "./src/store";
import { PersistGate } from "redux-persist/integration/react";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import Orientation from "react-native-orientation-locker";
import { client } from "./src/apollo/client";
import { ApolloProvider } from "@apollo/client";
import { MainStack } from "./src/components/NavigationStack/navigationStack";

function App(): JSX.Element {
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ApolloProvider client={client}>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <NavigationContainer>
              <MainStack />
            </NavigationContainer>
          </SafeAreaProvider>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
