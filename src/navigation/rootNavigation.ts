import {
  CommonActions,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { RootStackParamList } from "./types";

export const navigationRef = createNavigationContainerRef();
export const navigate = (name: string, params?: object) => {
  if (navigationRef.isReady()) {
    navigationRef.current.dispatch(CommonActions.navigate(name, params));
  }
};
export const resetNavigationRoot = (path: keyof RootStackParamList) => {
  if (navigationRef.isReady()) {
    navigate(path);
    console.log();
    navigationRef.current.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: path,
          },
        ],
      }),
    );
  }
};
