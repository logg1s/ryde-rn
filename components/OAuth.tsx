import { View, Text, Image } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { icons } from "@/constants";

const OAuth = () => {
  const handleGoogleLogin = async () => {};
  return (
    <View className="my-5 gap-y-5">
      <View className="flex-row justify-center items-center gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100"></View>
        <Text className="font-JakartaMedium">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100"></View>
      </View>

      <CustomButton
        IconLeft={() => (
          <Image source={icons.google} className="w-5 h-5 mx-2" />
        )}
        title="Login with Google"
        onPress={handleGoogleLogin}
        bgVariant="outline"
        textVariant="primary"
        className="w-5/6 self-center"
      />
    </View>
  );
};

export default OAuth;
