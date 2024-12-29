import "react-native-gesture-handler";

import React, { useEffect } from "react";
import { StatusBar, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from "@expo-google-fonts/karla";
import * as SplashScreen from "expo-splash-screen";

import { Loading } from "src/components/Loading";

// Import your global CSS file
import "./global.css";
import { Routes } from "@routes";
import { AuthContextProvider } from "src/contexts/AuthContext";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  });

  useEffect(() => {
    SplashScreen.hideAsync();
  }, [fontsLoaded]);

  return (
    <GestureHandlerRootView>
      <AuthContextProvider>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={"transparent"}
          translucent
        />
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </GestureHandlerRootView>
  );
}
