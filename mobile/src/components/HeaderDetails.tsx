import React from "react";
import { View, TouchableOpacity } from "react-native";
import { ArrowArcLeft, PencilSimpleLine } from "phosphor-react-native";

type Props = {
  handleGoBack: () => void;
  handleEditAds?: () => void;
  showContact?: boolean;
};

export function HeaderDetails({
  handleGoBack,
  handleEditAds,
  showContact = false,
}: Props) {
  return (
    <View className="mx-6 mt-5">
      <View className="w-full flex-row justify-between items-center">
        <TouchableOpacity onPress={handleGoBack}>
          <ArrowArcLeft color="#1A181B" size={24} />
        </TouchableOpacity>
        {!showContact && (
          <TouchableOpacity onPress={handleEditAds}>
            <PencilSimpleLine color="#1A181B" size={24} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
