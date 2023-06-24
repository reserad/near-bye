import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";
import { PersistConfig, persistReducer } from "redux-persist";
import { RootState } from "./rootState";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeviceInfo from "react-native-device-info";
import thunk from "redux-thunk";
import persistStore from "redux-persist/es/persistStore";

const persistConfig: PersistConfig<RootState> = {
  storage: AsyncStorage,
  key: DeviceInfo.getBundleId(),
};

const configureReducer = () => {
  return persistReducer(persistConfig, rootReducer);
};

export const store = configureStore({
  reducer: configureReducer(),
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
