import React from "react";
import { Alert, Platform, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { House, FilePlus, SignOut } from "phosphor-react-native";

import Home from "src/screens/App/Home";
import MyAds from "src/screens/App/MyAds";
import NewCreateAds from "src/screens/App/NewCreateAds";
import DetailsAds from "src/screens/App/DetailsAds";
import { useAuth } from "src/hooks/useAuth";

type AuthRoutes = {
  home: undefined;
  myAds: undefined;
  newCreateAds: undefined;
  logout: undefined;
  detailsAds: {
    id: string;
  };
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AuthRoutes>();

export default function AppRoutes() {
  const { signOut } = useAuth();

  function handleLogout() {
    Alert.alert(
      "Confirmar Logout",
      "Tem certeza que deseja sair?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            await signOut();
          },
        },
      ],
      { cancelable: true }
    );
  }

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#3E3A40",
        tabBarInactiveTintColor: "#9F9BA1",
        tabBarStyle: {
          backgroundColor: "#F7F7F8",
          borderTopWidth: 0,
          height: Platform.OS === "android" ? 72 : 76,
          paddingBottom: 28,
          paddingTop: 20,
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <House size={24} color={focused ? "#3E3A40" : "#9F9BA1"} />
          ),
        }}
      />
      <Screen
        name="myAds"
        component={MyAds}
        options={{
          tabBarIcon: ({ focused }) => (
            <FilePlus size={24} color={focused ? "#3E3A40" : "#9F9BA1"} />
          ),
        }}
      />

      <Screen
        name="logout"
        component={() => null}
        options={{
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity
              onPress={handleLogout}
              className="w-12 h-12 justify-center items-center "
            >
              {" "}
              <SignOut size={24} color={"#E07878"} style={{ padding: 10 }} />
            </TouchableOpacity>
          ),
        }}
      />

      <Screen
        name="newCreateAds"
        component={NewCreateAds}
        options={{
          tabBarItemStyle: { display: "none" },
        }}
      />

      <Screen
        name="detailsAds"
        component={DetailsAds}
        options={{
          tabBarItemStyle: { display: "none" },
        }}
      />
    </Navigator>
  );
}
