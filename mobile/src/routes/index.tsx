import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { AuthRoutes } from "./auth.routes";
import AppRoutes from "./app.routes";

import { useAuth } from "src/hooks/useAuth";
import { Loading } from "src/components/Loading";

export function Routes() {
  const { user, isLoadingUserStorageData } = useAuth();

  if (isLoadingUserStorageData) return <Loading />;

  return (
    <View className="flex-1 bg-gray-700 ">
      <NavigationContainer>
        {user != null && !!user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </View>
  );
}
