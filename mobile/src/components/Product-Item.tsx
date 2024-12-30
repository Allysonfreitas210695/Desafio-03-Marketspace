import React from "react";
import { View, Text, Image } from "react-native";

import { api } from "src/services/api";

import { useAuth } from "src/hooks/useAuth";

import { ProductMyProps } from "src/dtos/ProductDTO";

export function ProductItem({
  name,
  price,
  is_new,
  user,
  product_images,
}: ProductMyProps) {
  const { user: userProfile } = useAuth();

  const sourceImg = user ? user.avatar : userProfile?.avatar;

  return (
    <View className="w-[160px] h-[143px] bg-gray-700 rounded-md overflow-hidden mr-8">
      <View className="relative w-full h-[100px]">
        <Image
          source={{
            uri: `${api.defaults.baseURL}/images/${product_images.length > 0 && product_images[0].path}`,
          }}
          alt="imagem do produto"
          className="w-full h-full rounded-md"
        />

        <View className="absolute top-2 left-2 w-8 h-8 rounded-full bg-gray-100 border border-gray-300">
          <Image
            source={{ uri: `${api.defaults.baseURL}/images/${sourceImg}` }}
            alt="imagem do perfil"
            className="w-full h-full rounded-full"
          />
        </View>

        <View
          className={`absolute top-2 right-2 ${is_new ? "bg-blue-500" : "bg-gray-200"}  px-2 py-1 rounded-md`}
        >
          <Text className={`text-xs text-gray-700 font-bold`}>
            {is_new ? "NOVO" : "USADO"}
          </Text>
        </View>
      </View>

      <View className="p-2">
        <Text className="font-regular text-sm text-gray-200">{name}</Text>
        <Text className="text-sm text-gray-100 font-bold">
          R$ {""}
          <Text className="text-base">
            {price.toFixed(2).replace(".", ",")}
          </Text>
        </Text>
      </View>
    </View>
  );
}
