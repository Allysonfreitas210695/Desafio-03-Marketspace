import React from "react";
import { TouchableOpacity, View } from "react-native";

interface CheckedSwitchProps {
  checked?: boolean;
  onToggle: () => void;
}

const CheckedSwitch = ({ checked = false, onToggle }: CheckedSwitchProps) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      className={`flex-row items-center ${checked ? "bg-[#647AC7]" : "bg-gray-500"} w-12 h-6 rounded-full p-1 justify-between`}
      style={{ position: "relative" }}
    >
      <View
        className={`w-5 h-5 rounded-full bg-white transition-all duration-300 ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </TouchableOpacity>
  );
};

export default CheckedSwitch;
