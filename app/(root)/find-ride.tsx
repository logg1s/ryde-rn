import { View, Text } from "react-native";
import React from "react";
import { useLocationStore } from "@/store";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setUserLocation,
    setDestinationLocation,
  } = useLocationStore();
  console.log(userAddress);
  return (
    <View>
      <Text>Your are here: {userAddress}</Text>
      <Text>Your are going to: {destinationAddress}</Text>
    </View>
  );
};

export default FindRide;
