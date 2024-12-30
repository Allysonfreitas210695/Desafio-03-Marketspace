import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { X } from "phosphor-react-native";

interface TagProps {
  label: string;
  active?: boolean;
  onToggle: () => void;
}

const Tag = ({ label, active = false, onToggle }: TagProps) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      className={`flex-row items-center px-4 py-2 rounded-full ${
        active ? "bg-[#647AC7] text-white" : "bg-gray-500 text-gray-300"
      }`}
      style={{ maxWidth: active ? "30%" : "20%" }}
    >
      <Text
        className={`text-sm uppercase ${active ? "text-white" : "text-gray-300"}`}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {label}
      </Text>

      {active && (
        <View
          className="ml-2 w-6 h-6 rounded-full bg-white justify-center items-center"
          style={{ marginLeft: 8 }}
        >
          <X color="#647AC7" size={16} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Tag;
