import React from "react";
import { Alert, Platform, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { House, FilePlus, SignOut } from "phosphor-react-native";

import { useAuth } from "src/hooks/useAuth";

import { ProductDTO } from "src/dtos/ProductDTO";

import Home from "src/screens/App/Home";
import MyProducts from "src/screens/App/MyProducts";
import DetailsMyProduct from "src/screens/App/DetailsMyProduct";
import NewCreateProduct from "src/screens/App/NewCreateProduct";
import PreviewProduct from "src/screens/App/PreviewProduct";

type AuthRoutes = {
  home: undefined;
  myProducts: undefined;
  newCreateProduct: {
    product: ProductDTO | null;
    images: string[];
  };
  logout: undefined;
  detailsMyProduct: {
    id: string;
    showContact?: boolean;
  };
  previewProduct: {
    product: ProductDTO;
    images: string[];
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
        name="myProducts"
        component={MyProducts}
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
              <SignOut size={24} color={"#E07878"} style={{ padding: 10 }} />
            </TouchableOpacity>
          ),
        }}
      />

      <Screen
        name="newCreateProduct"
        component={NewCreateProduct}
        options={{
          tabBarItemStyle: { display: "none" },
        }}
      />

      <Screen
        name="detailsMyProduct"
        component={DetailsMyProduct}
        options={{
          tabBarItemStyle: { display: "none" },
        }}
      />
      <Screen
        name="previewProduct"
        component={PreviewProduct}
        options={{
          tabBarItemStyle: { display: "none" },
        }}
      />
    </Navigator>
  );
}
