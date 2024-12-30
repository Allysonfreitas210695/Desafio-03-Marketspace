import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface CheckedSwitchProps {
  checked?: boolean;
  onToggle: () => void;
}

const CheckedSwitch = ({ checked = false, onToggle }: CheckedSwitchProps) => {
  const translateX = useSharedValue(checked ? 24 : 0);

  // Atualizar a posição do botão com base no estado
  React.useEffect(() => {
    translateX.value = withTiming(checked ? 24 : 0, { duration: 300 });
  }, [checked]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <TouchableOpacity
      onPress={onToggle}
      style={[styles.switch, { backgroundColor: checked ? "#647AC7" : "gray" }]}
    >
      <Animated.View style={[styles.circle, animatedStyle]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switch: {
    flexDirection: "row",
    alignItems: "center",
    width: 48,
    height: 24,
    borderRadius: 12,
    padding: 2,
    justifyContent: "space-between",
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "white",
  },
});

export default CheckedSwitch;
