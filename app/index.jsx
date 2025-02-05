import React from "react";
import { Redirect } from "expo-router";

const Index = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/(root)/(tabs)/home"} />;
  }

  return <Redirect href={"/(auth)/welcome"} />;
};

export default Index;
