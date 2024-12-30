import React from "react";
import { View, Image, Pressable, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Plus, X } from "phosphor-react-native";

interface ImagePickerProps {
  selectedImages: string[];
  onAddImage: (uri: string) => void;
  onRemoveImage: (uri: string) => void;
}

export function ImagesProduct({
  selectedImages,
  onAddImage,
  onRemoveImage,
}: ImagePickerProps) {
  async function handleTakeImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) return;

    const selectedUri = result.assets[0].uri;

    const fileInfo = (await FileSystem.getInfoAsync(selectedUri)) as {
      size: number;
    };
    if (fileInfo.size && fileInfo.size > 5 * 1024 * 1024) {
      alert(
        "O arquivo selecionado excede o limite de 5 MB. Escolha uma imagem menor."
      );
      return;
    }

    onAddImage(selectedUri);
  }

  return (
    <View className="flex-row gap-4">
      {selectedImages.map((imageUri, index) => (
        <View key={index} className="relative">
          <Image
            source={{ uri: imageUri }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 8,
              marginBottom: 8,
            }}
          />
          <TouchableOpacity
            onPress={() => onRemoveImage(imageUri)}
            className="absolute top-1 right-2 p-2 bg-gray-200 rounded-full"
          >
            <X size={16} color="#FFF" />
          </TouchableOpacity>
        </View>
      ))}

      {selectedImages.length < 3 && (
        <Pressable
          onPress={handleTakeImage}
          className="mb-8 w-[100px] h-[100px] bg-gray-500 justify-center items-center rounded-md"
        >
          <Plus size={24} color="#9F9BA1" />
        </Pressable>
      )}
    </View>
  );
}
