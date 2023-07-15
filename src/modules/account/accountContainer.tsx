import { useNewDispatch } from "../../store/hooks/useNewDispatch";
import { signOut } from "../../store/user/actions/signOut";
import { BottomTabStackProps } from "../../navigation/types";
import { useCallback, useEffect, useState } from "react";
import { useGetUser } from "../users/hooks/useGetUser";
import { useNewSelector } from "../../store/hooks/useNewSelector";
import { getCurrentUser } from "../users/selectors/getCurrentUser";
import { setUser } from "../../store/user/actions/setUser";
import { launchImageLibrary } from "react-native-image-picker";
import { uploadImage } from "../../s3/client";
import { useUpdateUser } from "../users/hooks/useUpdateUser";
import {
  AccountScreen,
  AccountScreenPayload,
} from "./components/accountScreen";

export const AccountContainer = ({
  navigation,
}: BottomTabStackProps<"Account">) => {
  const dispatch = useNewDispatch();
  const [updatingUser, setUpdatingUser] = useState<boolean>(false);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const { name, profileImage } = useNewSelector(getCurrentUser);
  const { getUser } = useGetUser();
  const { updateUser } = useUpdateUser();

  const handleOnLogout = () => {
    dispatch(signOut());
    navigation.navigate("AuthStack", { screen: "SendOtp" });
  };

  const handleProfilePress = async () => {
    const { assets, errorMessage } = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.8,
      maxWidth: 2048,
      maxHeight: 2048,
    });
    if (!errorMessage) {
      setUploadingImage(true);
      const { uri, type, fileName } = assets[0];
      const response = await fetch(uri);
      const blob = await response.blob();
      const imageUrl = (
        await uploadImage({ body: blob, fileName, type })
      ).split("?")[0];
      const updatedUser = await updateUser({ profileImage: imageUrl });
      dispatch(setUser(updatedUser));
      setUploadingImage(false);
    }
  };

  const handleOnSave = useCallback(
    async ({ name }: AccountScreenPayload) => {
      setUpdatingUser(true);
      const updatedUser = await updateUser({ name });
      setUpdatingUser(false);
      dispatch(setUser(updatedUser));
    },
    [updateUser, name],
  );

  const fetchUser = async () => {
    const user = await getUser();
    dispatch(setUser(user));
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <AccountScreen
      onLogout={handleOnLogout}
      onProfilePress={handleProfilePress}
      onSave={handleOnSave}
      updatingUser={updatingUser}
      uploadingImage={uploadingImage}
    />
  );
};
