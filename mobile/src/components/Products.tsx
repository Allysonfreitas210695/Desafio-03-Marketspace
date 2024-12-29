import { View, FlatList, Pressable, Text } from "react-native";
import React from "react";

import { ProductItem } from "./Product-Item";
import { ProductDTO } from "src/dtos/ProductDTO";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "src/routes/app.routes";

type Props = {
  data: ProductDTO[];
  showDetails?: boolean;
};

export function Products({ data, showDetails = false }: Props) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleDetailsAds(id: string) {
    navigation.navigate("detailsAds", { id });
  }

  return (
    <FlatList
      data={data}
      style={{
        flex: 1,
        width: "100%",
        marginTop: 24,
      }}
      contentContainerStyle={[
        {
          gap: 24,
          width: "100%",
          paddingBottom: 40,
        },
        data.length === 0 && {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            if (showDetails) {
              handleDetailsAds(item.id);
            }
          }}
          style={{
            width: "auto",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <ProductItem {...item} />
        </Pressable>
      )}
      ListEmptyComponent={() => {
        return (
          <View
            style={{
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Nenhum produto encontrado</Text>
          </View>
        );
      }}
    />
  );
}
