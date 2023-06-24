import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

import { Provider } from "react-redux";
import { store, persistor } from "./src/store";
import { PersistGate } from "redux-persist/integration/react";
import {
  SafeAreaProvider,
  SafeAreaView,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import Orientation from "react-native-orientation-locker";

function App(): JSX.Element {
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <NavigationContainer>
            <SafeAreaView>
              <View>
                <Text>hello</Text>
              </View>
            </SafeAreaView>
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
