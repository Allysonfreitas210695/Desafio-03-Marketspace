import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Bank,
  Barcode,
  Power,
  QrCode,
  TrashSimple,
} from "phosphor-react-native";

import { AppNavigatorRoutesProps } from "src/routes/app.routes";

import { ProductDTO } from "src/dtos/ProductDTO";

import { HeaderDetails } from "src/components/HeaderDetails";
import ImageCarousel from "src/components/ImageCarousel";
import { Button } from "src/components/Button";

type ParamsProps = {
  id: string;
};

import { ScrollView } from "react-native";

export default function DetailsAds() {
  const router = useRoute();
  const { id } = router.params as ParamsProps;
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const [ads, setAds] = useState<ProductDTO>({
    id: "1",
    price: 100.9,
    productName: "Luminária pendente",
    profileImage: require("@assets/Image-1.png"),
    status: "NOVO" as const,
  });

  if (!id) navigation.goBack();

  function handleGoBack() {
    navigation.navigate("myAds");
  }

  return (
    <SafeAreaView className="h-full w-full">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 mb-10">
          <HeaderDetails
            handleGoBack={handleGoBack}
            handleEditAds={() => console.log("editando")}
          />

          <View className="mt-5 w-full mb-10">
            <View className="w-full">
              <ImageCarousel
                images={[
                  {
                    uri: "https://via.placeholder.com/400x300/FF0000/FFFFFF?text=Image+1",
                  },
                  {
                    uri: "https://via.placeholder.com/400x300/0000FF/FFFFFF?text=Image+2",
                  },
                  {
                    uri: "https://via.placeholder.com/400x300/0000FF/FFFFFF?text=Image+3",
                  },
                ]}
                isActive={true}
              />
            </View>
          </View>

          <View className="mx-6">
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <View className="w-[45] h-[45] border-2 rounded-full border-blue-100">
                <Image
                  source={{
                    uri: "http://www.github.com/Allysonfreitas210695.png",
                  }}
                  style={{ width: "100%", height: "100%", borderRadius: 50 }}
                  alt="imagem do perfil"
                  resizeMode="cover"
                />
              </View>
              <Text className="font-regular text-sm text-gray-100">
                Allyson Bruno
              </Text>
            </View>
          </View>

          <Text className="mx-6 mt-5 mb-[10] py-3 px-2 w-20 text-xs text-gray-200 font-bold text-center rounded-full bg-gray-500">
            {ads.status}
          </Text>

          <View className="mx-6  mb-2 flex-row justify-between items-center">
            <Text className="font-bold text-xl text-gray-100">
              {ads.productName}
            </Text>
            <Text className="font-bold text-sm text-blue-600 py-1">
              R${" "}
              <Text className="text-xl">
                {ads.price.toFixed(2).replace(".", ",")}
              </Text>
            </Text>
          </View>

          <View className="mx-6 mb-6">
            <Text className="font-regular text-sm text-start text-gray-200">
              Cras congue cursus in tortor sagittis placerat nunc, tellus arcu.
              Vitae ante leo eget maecenas urna mattis cursus.
            </Text>
          </View>

          <View className="mx-6 flex-row mb-4">
            <Text className="font-bold text-gray-200 text-sm mr-3">
              Aceita troca?
            </Text>
            <Text className="font-regular text-sm">Não</Text>
          </View>

          <View className="mx-6 mb-6">
            <Text className="font-bold text-gray-200 text-sm mr-3">
              Meios de pagamento:
            </Text>

            <View className="flex-row  gap-2 mt-2">
              <Barcode size={20} color="#1A181B" />
              <Text className="text-sm font-regular text-gray-200">
                {" "}
                Boleto
              </Text>
            </View>
            <View className="flex-row gap-2 mt-2">
              <QrCode size={20} color="#1A181B" />
              <Text className="text-sm font-regular text-gray-200">Pix</Text>
            </View>
            <View className="flex-row gap-2 mt-2">
              <Bank size={20} color="#1A181B" />
              <Text className="text-sm font-regular text-gray-200">
                Depósito Bancário
              </Text>
            </View>
          </View>

          <View className="mx-6 gap-3">
            <Button
              title="Desativar anúncio"
              variant="dark"
              showIcon
              icon={<Power size={20} color="#FFF" />}
              onPress={() => console.log("Desativar")}
            />
            <Button
              title="Excluir anúncio"
              variant="secondary"
              showIcon
              icon={<TrashSimple size={20} color="#5F5B62" />}
              onPress={() => console.log("Excluir")}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
