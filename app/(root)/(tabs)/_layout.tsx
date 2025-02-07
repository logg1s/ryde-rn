import { View, Text, Image, ImageSourcePropType } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "@/constants";

const TabIcon = ({
  focused,
  title,
  source,
}: {
  focused: boolean;
  title: string;
  source: ImageSourcePropType;
}) => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
      }}
    >
      <View
        style={{
          backgroundColor: focused ? "green" : "transparent",
          borderRadius: 70,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Image
          source={source}
          resizeMode="contain"
          tintColor={"white"}
          style={{ width: 25, height: 25 }}
        />
        <Text className="text-white font-JakartaMedium text-sm ">{title}</Text>
      </View>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "#333333",
          borderRadius: 50,
          alignSelf: "center",
          marginBottom: 5,
          height: 70,
          width: "95%",
          padding: 10,
        },
        tabBarIconStyle: {
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarShowLabel: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Home" focused={focused} source={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarShowLabel: false,
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.profile} title="Profile" />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          tabBarShowLabel: false,
          title: "Chat",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.chat} title="Chat" />
          ),
        }}
      />
      <Tabs.Screen
        name="ryde"
        options={{
          title: "Ryde",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.marker} title="Rides" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
