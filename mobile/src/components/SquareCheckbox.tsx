import { Check } from "phosphor-react-native";
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

interface SquareCheckboxProps {
  checked?: boolean;
  onToggle: () => void;
}

const SquareCheckbox = ({ checked = false, onToggle }: SquareCheckboxProps) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      className={`w-[24] h-[24] rounded-sm border-2 justify-center items-center ${
        checked
          ? "border-[#647AC7] bg-[#647AC7]"
          : "border-[#9F9BA1] bg-transparent"
      }`}
    >
      {checked && (
        <View className="w-full h-full justify-center items-center">
          <Check color="#FFF" size={20} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default SquareCheckbox;
