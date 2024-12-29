import React from "react";
import { View, TouchableOpacity } from "react-native";

interface RoundedCheckboxProps {
  checked?: boolean;
  onToggle: () => void;
}

const RoundedCheckbox = ({
  checked = false,
  onToggle,
}: RoundedCheckboxProps) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      className={`w-7 h-7 rounded-full border-2 justify-center items-center ${
        checked
          ? "border-[#647AC7] bg-[#647AC7]"
          : "border-[#9F9BA1] bg-transparent"
      }`}
    >
      {checked && (
        <View className="w-5 h-5 rounded-full bg-white justify-center items-center">
          <View className="w-3 h-3 rounded-full bg-[#647AC7]" />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default RoundedCheckbox;
