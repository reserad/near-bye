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
import { NavigationStack } from "./src/components/NavigationStack/navigationStack";
import { ApolloContainer } from "./src/apollo/apolloContainer";

function App(): JSX.Element {
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ApolloContainer>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <NavigationContainer>
              <NavigationStack />
            </NavigationContainer>
          </SafeAreaProvider>
        </ApolloContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
