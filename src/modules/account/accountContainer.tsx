import { View } from "react-native";
import { Screen } from "../../components/Screen/screen";
import { Button } from "../../components/Button/button";
import { useNewDispatch } from "../../store/hooks/useNewDispatch";
import { signOut } from "../../store/user/actions/signOut";
import { MainStackProps } from "../../navigation/types";

export const AccountContainer = ({ navigation }: MainStackProps<"Account">) => {
  const dispatch = useNewDispatch();
  const handleOnPress = () => {
    dispatch(signOut());
    navigation.navigate("AuthStack", { screen: "SendOtp" });
  };
  return (
    <Screen scroll>
      <View>
        <Button text="signout" onPress={handleOnPress} />
      </View>
    </Screen>
  );
};
