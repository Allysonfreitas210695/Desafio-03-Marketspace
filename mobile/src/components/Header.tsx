import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { Plus } from "phosphor-react-native";

import { api } from "src/services/api";

import { Button } from "./Button";
import { useAuth } from "src/hooks/useAuth";

type Props = {
  onPress: () => void;
};

export function Header({ onPress }: Props) {
  const { user } = useAuth();

  return (
    <View className="w-full h-12 mt-16 flex-row items-center gap-4">
      <View className="flex-row items-center gap-4">
        <View className="h-[45px] w-[45px] rounded-full border-2 border-blue-100">
          <Image
            source={{
              uri: `${api.defaults.baseURL}/images/${user?.avatar}`,
            }}
            style={{ width: "100%", height: "100%" }}
            alt="imagem do perfil"
            resizeMode="cover"
            className="rounded-full"
          />
        </View>
        <Text className="font-regular text-base text-gray-100 text-start w-[125]">
          Boas vindas,{"\n"}
          <Text className="font-bold text-base">{user?.name}</Text>
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <Button
          title="Criar anúncio"
          variant="dark"
          showIcon
          icon={<Plus size={16} color="#FFF" />}
          onPress={onPress}
        />
      </View>
    </View>
  );
}
