import React, { useState, useEffect } from "react";
import { Modal, Text, Animated, View, Dimensions } from "react-native";
import { Button } from "./Button";

type CustomAlertModalProps = {
  isVisible: boolean;
  title?: string;
  message: string;
  onClose: () => void;
};

const { width: screenWidth } = Dimensions.get("screen");

export function CustomAlertModal({
  isVisible,
  title = "Alerta!",
  message,
  onClose,
}: CustomAlertModalProps) {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, fadeAnim]);

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Animated.View
        className="flex-1 justify-center items-center"
        style={[
          { opacity: fadeAnim },
          { backgroundColor: "rgba(0, 0, 0, 0.8)" },
        ]}
      >
        <View
          className="p-6 bg-white rounded-lg shadow-lg"
          style={{
            width: screenWidth - 40,
            maxHeight: 300,
          }}
        >
          <Text className="font-bold text-3xl text-center text-gray-800 mb-3">
            {title}
          </Text>
          <Text className="text-xl text-gray-400 mb-6 text-center">
            {message}
          </Text>

          <View className="flex-row justify-center">
            <Button title="Entendi" variant="warning" onPress={onClose} />
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
}
