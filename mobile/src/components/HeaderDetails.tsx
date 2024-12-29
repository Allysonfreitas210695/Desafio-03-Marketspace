import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ArrowArcLeft, PencilSimpleLine } from "phosphor-react-native";

type Props = {
  handleGoBack: () => void;
  handleEditAds: () => void;
};

export function HeaderDetails({ handleGoBack, handleEditAds }: Props) {
  return (
    <View className="mx-6 mt-5">
      <View className="w-full flex-row justify-between items-center">
        <TouchableOpacity onPress={handleGoBack}>
          <ArrowArcLeft color="#1A181B" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEditAds}>
          <PencilSimpleLine color="#1A181B" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
