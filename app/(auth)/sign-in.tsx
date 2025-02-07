import { Alert, Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignIn } from "@clerk/clerk-expo";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      Alert.alert("Error", err?.errors[0]?.longMessage);
      console.error(JSON.stringify(err, null, 2));
    }
  };
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
          title="Sign In"
          className="mt-6 w-5/6 self-center"
          onPress={onSignInPress}
        />
        <OAuth />
        <Text className="text-lg text-center font-JakartaMedium text-general-200 mt-10">
          Haven't an account?{" "}
          <Link href={"/(auth)/sign-up"}>
            <Text className="text-primary-500">SignUp now</Text>
          </Link>
        </Text>
      </View>
    </ScrollView>
  );
};

export default SignIn;
