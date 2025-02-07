import { View, Text, Image } from "react-native";
import React from "react";
import { Ride } from "@/types/type";
import { icons } from "@/constants";
import { formatDate, formatTime } from "@/lib/utils";

const RydeCard = ({
  item: {
    destination_latitude,
    destination_longitude,
    origin_address,
    destination_address,
    created_at,
    ride_time,
    driver,
    payment_status,
  },
}: {
  item: Ride;
}) => {
  return (
    <View className="bg-white shadow-md shadow-neutral-300 mb-5 rounded-xl p-5 gap-x-5">
      <View className="flex-row gap-x-5">
        <Image
          source={{
            uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14.3497&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
          }}
          className="w-[80px] h-[90px] rounded-lg"
        />

        <View className="justify-center gap-y-3">
          <View className="flex-row items-center gap-x-2">
            <Image source={icons.to} className="w-5 h-5" />
            <Text className="font-JakartaMedium text-lg" numberOfLines={1}>
              {origin_address}
            </Text>
          </View>

          <View className="flex-row items-center gap-x-2">
            <Image source={icons.point} className="w-5 h-5" />
            <Text className="font-JakartaMedium text-lg" numberOfLines={1}>
              {destination_address}
            </Text>
          </View>
        </View>
      </View>

      <View className="gap-5 mt-5 p-3 bg-neutral-100 rounded-xl">
        <View className="flex-row justify-between">
          <Text className="text-lg font-JakartaMedium text-gray-500">
            Date & Time
          </Text>
          <Text className="text-lg font-JakartaMedium text-gray-500 ">
            {formatDate(created_at)}, {formatTime(ride_time)}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-lg font-JakartaMedium text-gray-500 ">
            Driver
          </Text>
          <Text className="text-lg font-JakartaMedium text-gray-500 ">
            {driver?.first_name}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-lg font-JakartaMedium text-gray-500 ">
            Car Seats
          </Text>
          <Text className="text-lg font-JakartaMedium text-gray-500 ">
            {driver.car_seats}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-lg font-JakartaMedium text-gray-500">
            Payment Status
          </Text>
          <Text
            className={`capitalize text-lg font-JakartaMedium ${payment_status === "paid" ? "text-green-500" : "text-red-500"}`}
          >
            {payment_status}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RydeCard;
