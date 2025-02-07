import { View, Text, Image } from "react-native";
import React, { useCallback, useEffect } from "react";
import CustomButton from "./CustomButton";
import * as WebBrowser from "expo-web-browser";
import { icons } from "@/constants";
import { useOAuth, useSSO } from "@clerk/clerk-expo";
import { fetchAPI } from "@/lib/fetch";
import * as Linking from "expo-linking";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();
const OAuth = () => {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const handleGoogleLogin = useCallback(async () => {
    try {
      const { createdSessionId, setActive, signUp } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/(root)/(tabs)/home"),
      });

      if (createdSessionId) {
        setActive!({
          session: createdSessionId,
        });
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: `${signUp?.firstName} ${signUp?.lastName}`,
            email: signUp?.emailAddress,
            clerkId: signUp?.createdUserId,
          }),
        });
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);

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
