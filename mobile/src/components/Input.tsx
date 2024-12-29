import React, { useRef, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  TextInputProps,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = TextInputProps & {
  isActive?: boolean;
  error?: string;
  secureTextEntry?: boolean;
};

export function Input({
  isActive = false,
  error,
  secureTextEntry = false,
  ...rest
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<TextInput>(null);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <View
        className={`w-full px-4 py-2 rounded-md bg-gray-700 flex-row justify-between items-center ${isFocused ? "border border-gray-300" : "border border-transparent"}`}
      >
        <TextInput
          {...rest}
          ref={inputRef}
          secureTextEntry={secureTextEntry && !showPassword}
          placeholderTextColor={"#9F9BA1"}
          className="text-gray-100  flex-1 text-sm font-regular h-12"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={handleTogglePasswordVisibility}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#9F9BA1"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text className="text-red-500 mt-1 text-sm font-light">{error}</Text>
      )}
    </>
  );
}
