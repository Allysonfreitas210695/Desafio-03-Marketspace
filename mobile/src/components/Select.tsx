import { Picker } from "@react-native-picker/picker";
import { Text, View } from "react-native";

type Props = {
  options: string[];
  selected: string;
  onChangeSelected: (item: string) => void;
};

export default function Select({ options, selected, onChangeSelected }: Props) {
  return (
    <View
      style={{
        width: 140,
        borderColor: "#D9D8DA",
        borderRadius: 8,
        borderWidth: 1,
      }}
    >
      <Picker
        selectedValue={selected}
        onValueChange={(itemValue) => onChangeSelected(itemValue)}
        style={{
          width: "100%",
          fontFamily: "regular",
          fontWeight: "bold",
        }}
      >
        {options.map((option) => (
          <Picker.Item key={option} label={option} value={option} />
        ))}
      </Picker>
    </View>
  );
}
