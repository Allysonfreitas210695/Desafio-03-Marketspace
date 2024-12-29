import React, { useState } from "react";
import { View, Image, Dimensions, Text } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

type ImageType = {
  uri: string;
};

type Props = {
  images: ImageType[];
  isActive?: boolean;
};

export default function ImageCarousel({ images, isActive = false }: Props) {
  const [index, setIndex] = useState(0);

  return (
    <View className="w-full">
      <View
        style={{
          flex: 1,
          position: "relative",
        }}
      >
        <Carousel
          data={images}
          renderItem={({ item }) => (
            <View>
              <View
                style={{
                  position: "relative",
                  width: "100%",
                }}
              >
                {!isActive && (
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
                      zIndex: 1,
                    }}
                  >
                    <Text className="font-bold text-sm text-gray-700 uppercase w-full text-center">
                      Anúncio desativado
                    </Text>
                  </View>
                )}

                <Image
                  source={{ uri: item.uri }}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </View>
            </View>
          )}
          width={width}
          height={300}
          scrollAnimationDuration={100}
          onSnapToItem={(index) => setIndex(index)}
        />

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            position: "absolute",
            top: 270,
          }}
        >
          {images.map((_, idx) => (
            <View
              key={idx}
              style={{
                marginHorizontal: 5,
                height: 3,
                width: 120,
                backgroundColor: idx === index ? "#555258" : "#F7F7F8",
              }}
            ></View>
          ))}
        </View>
      </View>
    </View>
  );
}
