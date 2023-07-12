import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Screen } from "../../components/Screen/screen";
import { Button } from "../../components/Button/button";
import { useNewDispatch } from "../../store/hooks/useNewDispatch";
import { signOut } from "../../store/user/actions/signOut";
import { BottomTabStackProps } from "../../navigation/types";
import { Theme } from "../../shared/theme";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { client } from "../../s3/client";
import {
  CreateBucketCommand,
  PutObjectCommand,
  UploadPartCommand,
} from "@aws-sdk/client-s3";
import { useEffect } from "react";
import { useGetUser } from "../users/hooks/useGetUser";
import { useNewSelector } from "../../store/hooks/useNewSelector";
import { getCurrentUser } from "../users/selectors/getCurrentUser";
import { setUser } from "../../store/user/actions/setUser";

export const AccountContainer = ({
  navigation,
}: BottomTabStackProps<"Account">) => {
  const dispatch = useNewDispatch();
  const handleOnPress = () => {
    dispatch(signOut());
    navigation.navigate("AuthStack", { screen: "SendOtp" });
  };
  const { getUser } = useGetUser();
  const user = useNewSelector(getCurrentUser);
  const handleProfilePress = async () => {
    // const { assets, errorMessage } = await launchImageLibrary({
    //   mediaType: "photo",
    // });
    // if (!errorMessage) {
    //   const { uri, type, fileName } = assets[0];
    //   const response = await fetch(uri);
    //   const blob = await response.blob();
    //   await client.send(
    //     new PutObjectCommand({
    //       Bucket: "profile-images",
    //       Body: blob,
    //       Key: fileName,
    //       ContentType: type,
    //     }),
    //   );
    // const name = await createPresignedUrlWithClient({
    //   bucket: "profile-images",
    //   key: fileName,
    //   region: "us-east-2",
    // });
    // console.log(name);
    //}
  };

  const fetchUser = async () => {
    const user = await getUser();
    dispatch(setUser(user));
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <Screen scroll>
      <View style={styles.container}>
        <View style={styles.profilePictureContainer}>
          <TouchableOpacity activeOpacity={0.6} onPress={handleProfilePress}>
            <View style={styles.profilePicture}>
              {user.profileImage ? (
                <Image
                  source={{
                    uri: user.profileImage,
                  }}
                  style={styles.profilePicture}
                />
              ) : null}
            </View>
          </TouchableOpacity>
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
