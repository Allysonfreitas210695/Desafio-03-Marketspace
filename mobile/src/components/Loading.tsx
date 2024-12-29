import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

export function Loading() {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <ActivityIndicator color="#364D9D" size="large" />
    </View>
  );
}