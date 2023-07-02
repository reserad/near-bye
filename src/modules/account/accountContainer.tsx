import { StyleSheet, View } from "react-native";
import { Screen } from "../../components/Screen/screen";
import { Button } from "../../components/Button/button";
import { useNewDispatch } from "../../store/hooks/useNewDispatch";
import { signOut } from "../../store/user/actions/signOut";
import { BottomTabStackProps } from "../../navigation/types";
import { Theme } from "../../shared/theme";

export const AccountContainer = ({
  navigation,
}: BottomTabStackProps<"Account">) => {
  const dispatch = useNewDispatch();
  const handleOnPress = () => {
    dispatch(signOut());
    navigation.navigate("AuthStack", { screen: "SendOtp" });
  };
  return (
    <Screen scroll>
      <View style={styles.container}>
        <View style={styles.profilePictureContainer}>
          <View style={styles.profilePicture} />
        </View>
        <Button text="Sign out" onPress={handleOnPress} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Theme.padding.P4,
  },
  profilePictureContainer: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginBottom: Theme.padding.P4,
  },
  profilePicture: {
    width: Theme.padding.P26,
    height: Theme.padding.P26,
    borderRadius: Theme.padding.P13,
    backgroundColor: Theme.color.white,
    borderColor: Theme.color.mediumGray,
    borderWidth: 1,
  },
});
