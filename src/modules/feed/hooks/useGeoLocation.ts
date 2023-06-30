import Geolocation from "@react-native-community/geolocation";
import { useCallback } from "react";

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export const useGeoLocation = () => {
  const getCoordinates = useCallback(async () => {
    console.info("Getting location started");
    return new Promise<Coordinates>((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          console.info("Getting location succeeded");
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        error => {
          console.error("Getting location failed: ", error);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 5,
        },
      );
    });
  }, []);

  return { getCoordinates };
};
