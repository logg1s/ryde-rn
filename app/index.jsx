import React from "react";
import { Redirect } from "expo-router";
import { useAuth, useClerk } from "@clerk/clerk-expo";

const Index = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/(root)/(tabs)/home"} />;
  }

  return <Redirect href={"/(auth)/welcome"} />;
};

export default Index;
