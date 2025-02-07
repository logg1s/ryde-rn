import { Alert, Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import { ReactNativeModal } from "react-native-modal";
import { fetchAPI } from "@/lib/fetch";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({ ...verification, state: "pending" });
    } catch (err) {
      Alert.alert("Error", err?.errors[0]?.longMessage);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (signUpAttempt.status === "complete") {
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: signUpAttempt.createdUserId,
          }),
        });
        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          state: "failed",
          error: "Verification failed",
        });
      }
    } catch (err) {
      setVerification({
        ...verification,
        error: err?.errors[0]?.longMessage,
      });
    }
  };
  return (
    <ScrollView className="flex-1 bg-white">
      <View>
        <Image source={images.signUpCar} className="w-full h-[250px]" />
        <Text className="font-JakartaBold text-3xl text-center w-full">
          Create Your Account
        </Text>
      </View>
      <View className="px-6 py-5">
        <InputField
          label="Name"
          icon={icons.person}
          placeholder="Enter your name"
          value={form.name}
          onChangeText={(e) => setForm((prev) => ({ ...prev, name: e }))}
        />
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
          onPress={onSignUpPress}
        />
        <OAuth />
        <Text className="text-lg text-center font-JakartaMedium text-general-200 mt-10">
          Already have an account?{" "}
          <Link href={"/(auth)/sign-in"}>
            <Text className="text-primary-500">Login</Text>
          </Link>
        </Text>
        <ReactNativeModal isVisible={verification.state === "pending"}>
          <View className="bg-white p-7 rounded-2xl gap-y-5">
            <View>
              <Text className="text-3xl font-JakartaBold">Verified</Text>
              <Text className="text-base text-gray-400 font-JakartaMedium">
                You have successfully verified your account
              </Text>
            </View>
            <View>
              <InputField
                label="Code"
                icon={icons.lock}
                placeholder="12345"
                onChangeText={(e) =>
                  setVerification({ ...verification, code: e })
                }
                keyboardType="numeric"
              />
              {verification.error && (
                <Text className="text-red-500 text-base font-JakartaMedium">
                  {verification.error}
                </Text>
              )}
            </View>
            <CustomButton
              title="Verity Email"
              className="bg-success-500"
              onPress={onVerifyPress}
            />
          </View>
        </ReactNativeModal>
        <ReactNativeModal isVisible={verification.state === "success"}>
          <View className="bg-white justify-center items-center p-7 rounded-2xl gap-5">
            <Image source={images.check} className="w-[110px] h-[110px] " />
            <Text className="text-3xl font-JakartaBold">Verified</Text>
            <Text className="text-base text-gray-400 font-JakartaMedium">
              You have successfully verified your account
            </Text>
            <CustomButton
              title="Browser Home"
              onPress={() => router.replace("/(root)/(tabs)/home")}
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
