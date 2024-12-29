import React from "react";
import {
  View,
  Text,
  TouchableOpacityProps,
  TouchableOpacity,
} from "react-native";

type Props = TouchableOpacityProps & {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: "dark" | "primary" | "secondary" | "warning";
  showIcon?: boolean;
  icon?: React.ReactNode;
};

export function Button({
  title,
  variant = "dark",
  onPress,
  showIcon = false,
  disabled = false,
  icon,
  ...rest
}: Props) {
  return (
    <TouchableOpacity
      className="w-full h-[48] rounded-md"
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
      {...rest}
    >
      <View
        className={`p-3 w-full h-full  ${variant === "dark" ? "bg-gray-100" : variant === "primary" ? "bg-blue-600" : variant === "warning" ? "bg-red-500" : "bg-gray-500"} flex-row justify-center items-center gap-2 rounded-md`}
      >
        {showIcon && icon}
        <Text
          className={`${variant === "secondary" ? "text-gray-200" : "text-gray-700"} text-sm font-bold items-center`}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
