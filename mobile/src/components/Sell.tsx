import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ArrowRight, FilePlus } from "phosphor-react-native";

export function Sell() {
  return (
    <View
      className="py-3 pl-4 pr-5 rounded-md mt-2 flex-row justify-between items-center"
      style={{ backgroundColor: "rgba(100, 122, 199, 0.1)" }}
    >
      <View className="flex-row items-center gap-2">
        <FilePlus size={20} color="#364D9D" />
        <View className="">
          <Text className="font-bold text-xl">4</Text>
          <Text className="font-regular text-xs">anúncios ativos</Text>
        </View>
      </View>
      <View className="flex-row justify-center items-center gap-2">
        <TouchableOpacity className="flex-row items-center gap-1">
          <Text className="text-blue-100 font-bold text-xs">Meus anúncios</Text>
          <ArrowRight color="#364D9D" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
