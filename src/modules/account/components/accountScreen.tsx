import { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNewSelector } from "../../../store/hooks/useNewSelector";
import { getCurrentUser } from "../../users/selectors/getCurrentUser";
import { Screen } from "../../../components/Screen/screen";
import { ShimmerCircle } from "./shimmerCircle";
import { TextField } from "../../../components/TextField/textField";
import { Theme } from "../../../shared/theme";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../../components/Button/button";

export type AccountScreenPayload = {
  name: string;
};

type AccountScreenProps = {
  updatingUser: boolean;
  uploadingImage: boolean;
  onProfilePress(): void;
  onSave(payload: AccountScreenPayload): void;
  onLogout(): void;
};

export const AccountScreen = ({
  updatingUser,
  uploadingImage,
  onProfilePress,
  onSave,
  onLogout,
}: AccountScreenProps) => {
  const [usersName, setUsersName] = useState<string>("");
  const { name, profileImage } = useNewSelector(getCurrentUser);

  useEffect(() => {
    setUsersName(name);
  }, [name]);

  return (
    <Screen scroll>
      <View style={styles.container}>
        <View style={styles.profilePictureContainer}>
          {uploadingImage ? (
            <ShimmerCircle />
          ) : (
            <TouchableOpacity activeOpacity={0.6} onPress={onProfilePress}>
              <View style={styles.profilePicture}>
                {profileImage ? (
                  <Image
                    source={{
                      uri: profileImage,
                    }}
                    style={styles.profilePicture}
                  />
                ) : null}
              </View>
            </TouchableOpacity>
          )}
        </View>
        <TextField
          color={Theme.color.black}
          badge={faUser}
          placeholder="Name"
          value={usersName}
          onChangeText={value => setUsersName(value)}
        />
        <Button
          text="Save"
          onPress={() => onSave({ name })}
          loading={updatingUser}
        />
        <Button text="Sign out" onPress={onLogout} />
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
  },
});
