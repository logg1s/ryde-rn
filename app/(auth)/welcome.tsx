import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { router } from "expo-router";
import { onboarding } from "@/constants";
import CustomButton from "@/components/CustomButton";

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastIndex = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex-1 items-center">
      <TouchableOpacity
        className="justify-end items-end p-5 w-full"
        onPress={() => router.replace("/(auth)/sign-up")}
      >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0]" />}
        activeDot={<View className="w-[32px] h-[4px] mx-1 bg-[#0286FF]" />}
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id}>
            <Image
              source={item.image}
              resizeMode="contain"
              className="w-full h-[300px]"
            />
            <View className="mt-10">
              <Text className="text-black text-4xl font-JakartaBold mx-10 text-center">
                {item.title}
              </Text>
              <Text className="text-1xl font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastIndex ? "Get Started" : "Next"}
        className="w-3/5 mt-10 mb-10"
        onPress={() => {
          isLastIndex
            ? router.push("/(auth)/sign-up")
            : swiperRef?.current?.scrollBy(1);
        }}
      />
    </SafeAreaView>
  );
};

export default Welcome;
