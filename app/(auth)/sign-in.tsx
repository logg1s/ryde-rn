import { Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import OAuth from "@/components/OAuth";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const onPressSignIn = async () => {};
  return (
    <ScrollView className="flex-1 bg-white">
      <View>
        <Image source={images.signUpCar} className="w-full h-[250px]" />
        <Text className="font-JakartaBold text-3xl text-center w-full">
          Login to Ryde
        </Text>
      </View>
      <View className="px-6 py-5">
        <InputField
          label="Email"
          icon={icons.email}
          placeholder="Enter your email"
          value={form.email}
          onChangeText={(e) => setForm((prev) => ({ ...prev, email: e }))}
        />
        <InputField
          label="Password"
          icon={icons.lock}
          placeholder="Enter your password"
          value={form.password}
          secureTextEntry={true}
          onChangeText={(e) => setForm((prev) => ({ ...prev, password: e }))}
        />
        <CustomButton
          title="Sign Up"
          className="mt-6 w-5/6 self-center"
          onPress={onPressSignIn}
        />
        <OAuth />
        <Text className="text-lg text-center font-JakartaMedium text-general-200 mt-10">
          Already have an account?{" "}
          <Link href={"/(auth)/sign-in"}>
            <Text className="text-primary-500">Login</Text>
          </Link>
        </Text>
      </View>
    </ScrollView>
  );
};

export default SignIn;
