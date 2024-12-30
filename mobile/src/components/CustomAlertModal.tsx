import React, { useEffect } from "react";
import { Modal, Text, View, Dimensions } from "react-native";
import { Button } from "./Button";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

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
  const fadeAnim = useSharedValue(0);

  useEffect(() => {
    fadeAnim.value = withTiming(isVisible ? 1 : 0, { duration: 300 });
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  }));

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ ...animatedStyle }}>
          <View
            style={{
              padding: 24,
              backgroundColor: "white",
              borderRadius: 10,
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 5,
              width: screenWidth - 40,
              maxHeight: 300,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 24,
                textAlign: "center",
                color: "#333",
                marginBottom: 12,
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                color: "#777",
                marginBottom: 24,
              }}
            >
              {message}
            </Text>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Button title="Entendi" variant="warning" onPress={onClose} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
