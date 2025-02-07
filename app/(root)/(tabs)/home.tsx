import Map from "@/components/Map";
import RydeCard from "@/components/RydeCard";
import { icons, images } from "@/constants";
import { useLocationStore } from "@/store";
import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/clerk-expo";
import { isLoading } from "expo-font";
import { Redirect, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import GoogleTextInput from "@/components/GoogleTextInput";
import { useFetch } from "@/lib/fetch";
import { Ride } from "@/types/type";

export default function Page() {
  const { signOut } = useClerk();
  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const { user } = useUser();
  const [hasLocationPermission, setHasLocationPermission] = useState(true);
  const {
    data: recentRyde,
    loading,
    error,
    refetch,
  } = useFetch<Ride[]>(`/(api)/ride/${user?.id}`);
  useEffect(() => {
    const requestLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasLocationPermission(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const address = await Location.reverseGeocodeAsync({
        latitude: currentLocation?.coords?.latitude,
        longitude: currentLocation?.coords?.longitude,
      });

      setUserLocation({
        latitude: currentLocation?.coords?.latitude,
        longitude: currentLocation?.coords?.longitude,
        address: `${address[0]?.name}, ${address[0]?.region}`,
      });
    };

    requestLocation();
  }, []);

  const handleSignOut = () => {
    Alert.alert("Sign out", "Do you wanna sign out ?", [
      { text: "Cancel" },
      {
        text: "OK",
        onPress: () => {
          signOut();
          router.replace("/(auth)/welcome");
        },
      },
    ]);
  };

  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);
    router.push("/(root)/find-ride");
  };

  return (
    <SafeAreaView className="flex-1 bg-general-500">
      <SignedIn>
        <FlatList
          data={recentRyde}
          renderItem={({ item }) => <RydeCard item={item} />}
          className="px-5"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingBottom: 20,
          }}
          ListEmptyComponent={() => (
            <View className="justify-center items-center">
              {loading ? (
                <ActivityIndicator size={"small"} color={"#000"} />
              ) : (
                <>
                  <Image
                    source={images.noResult}
                    resizeMode="contain"
                    className="w-40 h-40"
                  />
                  <Text>No recent rides found</Text>
                </>
              )}
            </View>
          )}
          ListHeaderComponent={() => (
            <>
              <View className="flex-row justify-between items-center mb-10">
                <Text
                  className="capitalize font-JakartaExtraBold text-2xl"
                  numberOfLines={1}
                >
                  Welcome,{" "}
                  {user?.firstName ||
                    user?.emailAddresses[0].emailAddress.split("@")[0]}
                </Text>
                <TouchableOpacity onPress={handleSignOut}>
                  <Image source={icons.out} className="w-5 h-5" />
                </TouchableOpacity>
              </View>
              <GoogleTextInput handlePress={handleDestinationPress} />
              <Text className="font-JakartaBold text-xl mb-2">
                Your Current Location
              </Text>
              <View className="justify-center items-center p-2 rounded-lg bg-white mb-10">
                <Map />
              </View>
              <Text className="font-JakartaBold text-xl mb-2">
                Recent Rides
              </Text>
            </>
          )}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refetch} />
          }
        />
      </SignedIn>
      <SignedOut>
        <Redirect href={"/(auth)/welcome"} />
      </SignedOut>
    </SafeAreaView>
  );
}
