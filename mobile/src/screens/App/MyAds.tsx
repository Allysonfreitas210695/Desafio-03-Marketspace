import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Plus } from "phosphor-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Select from "src/components/Select";
import { Products } from "src/components/Products";

export default function MyAds() {
  const [products, setProducts] = useState([
    {
      id: "1",
      status: "USADO" as const,
      price: 59.9,
      productName: "Tênis vermelho",
      profileImage: require("@assets/Image-1.png"),
    },
    {
      id: "2",
      status: "NOVO" as const,
      price: 79.9,
      productName: "Camiseta azul",
      profileImage: require("@assets/Image-2.png"),
    },
    {
      id: "3",
      status: "NOVO" as const,
      price: 79.9,
      productName: "Camiseta azul",
      profileImage: require("@assets/Image-3.png"),
    },
    {
      id: "4",
      status: "NOVO" as const,
      price: 79.9,
      productName: "Camiseta azul",
      profileImage: require("@assets/Image-4.png"),
    },
    {
      id: "5",
      status: "NOVO" as const,
      price: 79.9,
      productName: "Camiseta azul",
      profileImage: require("@assets/Image-5.png"),
    },
    {
      id: "6",
      status: "NOVO" as const,
      price: 79.9,
      productName: "Camiseta azul",
      profileImage: require("@assets/Image-6.png"),
    },
    {
      id: "7",
      status: "NOVO" as const,
      price: 79.9,
      productName: "Camiseta azul",
      profileImage: require("@assets/Image-1.png"),
    },
    {
      id: "8",
      status: "NOVO" as const,
      price: 120,
      productName: "Camiseta azul",
      profileImage: require("@assets/Image-2.png"),
    },
  ]);

  const [selected, setSelected] = useState("Todos");

  return (
    <SafeAreaView>
      <View className="w-full h-full">
        <View className="mb-8 w-full flex-row items-center mt-5 relative">
          <Text className="font-bold w-full text-gray-100 text-xl text-center">
            Meus anúncios
          </Text>
          <TouchableOpacity className="absolute right-3 p-2 rounded-full">
            <Plus color="#1A181B" size={20} />
          </TouchableOpacity>
        </View>

        <View className="mx-6 flex-row justify-between items-center">
          <Text className="font-regular text-gray-200 text-sn">
            {products.length} anúncios
          </Text>
          <View className="flex-grow items-end">
            <Select
              selected={selected}
              onChangeSelected={(item) => setSelected(item)}
              options={["Todos", "Ativos", "Inativos"]}
            />
          </View>
        </View>

        <View className="flex-1 mx-6 mt-7 h-full">
          <Products data={products} showDetails={true} />
        </View>
      </View>
    </SafeAreaView>
  );
}
