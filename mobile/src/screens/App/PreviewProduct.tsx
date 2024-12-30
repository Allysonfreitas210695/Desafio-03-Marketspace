import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeft, FilePlus } from "phosphor-react-native";

import { api } from "src/services/api";

import { useAuth } from "src/hooks/useAuth";

import { AppNavigatorRoutesProps } from "src/routes/app.routes";

import { ProductDTO } from "src/dtos/ProductDTO";

import ImageCarousel from "src/components/ImageCarousel";
import { Button } from "src/components/Button";
import { Loading } from "src/components/Loading";

type ParamsProps = {
  product: ProductDTO;
  images: string[];
};

export default function PreviewProduct() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  const router = useRoute();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { product, images } = router.params as ParamsProps;

  const imageObjects = images.map((image) => ({ uri: image }));

  const paymentMethodIcons: Record<string, JSX.Element> = {};

  async function handleSubmitProduct() {
    try {
      setLoading(true);

      const { data } = await api.post("/products/", {
        name: product.name,
        description: product.description,
        is_new: product.is_new,
        price: product.price,
        accept_trade: product.accept_trade,
        payment_methods: product.payment_methods,
      });

      if (images.length > 0) {
        const formData = new FormData();

        images.forEach((image, index) => {
          const file = {
            uri: image,
            type: "image/jpeg",
            name: `image_${index}.jpg`,
          } as any;
          console.log(file);
          formData.append("images", file);
        });

        formData.append("product_id", data.id);
        console.log(data.id);

        const response = await api.post("/products/images/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao enviar produto ou imagens:", error);
      alert("Erro ao enviar o produto. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="w-full h-full bg-gray-700">
      {loading && <Loading />}
      <View className="bg-blue-600 h-[121]" style={{ opacity: 1 }}>
        <View className="flex-1 mt-16">
          <Text className="w-full text-center font-bold text-base text-gray-700">
            Pré visualização do anúncio
          </Text>
          <Text className="w-full text-center font-regular text-sm text-gray-700">
            É assim que seu produto vai aparecer!
          </Text>
        </View>
      </View>

      <View className="w-full h-[280] mb-6">
        <ImageCarousel images={imageObjects} isActive />
      </View>

      <ScrollView
        style={{ flexBasis: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="mx-6 mt-5 flex-row items-center gap-2">
          <View className="w-[45] h-[45] border-2 rounded-full border-blue-100">
            <Image
              source={{
                uri: user?.avatar
                  ? `${api.defaults.baseURL}/images/${user.avatar}`
                  : "https://via.placeholder.com/45",
              }}
              style={{ width: "100%", height: "100%", borderRadius: 50 }}
              alt="imagem do perfil"
              resizeMode="cover"
            />
          </View>
          <Text className="font-regular text-sm text-gray-100">
            {user?.name || "Usuário Anônimo"}
          </Text>
        </View>

        <Text className="mx-6 mt-5 mb-[10] py-3 px-2 w-20 text-xs text-gray-200 font-bold text-center rounded-full bg-gray-500">
          {product.is_new ? "NOVO" : "USADO"}
        </Text>

        {/* Nome e preço do produto */}
        <View className="mx-6 mb-2 flex-row justify-between items-center">
          <Text className="font-bold text-xl text-gray-100">
            {product.name}
          </Text>
          <Text className="font-bold text-sm text-blue-600 py-1">
            R${" "}
            <Text className="text-xl">
              {product.price.toFixed(2).replace(".", ",")}
            </Text>
          </Text>
        </View>

        <View className="mx-6 mb-6">
          <Text className="font-regular text-sm text-start text-gray-200">
            {product.description}
          </Text>
        </View>

        <View className="mx-6 flex-row mb-4">
          <Text className="font-bold text-gray-200 text-sm mr-3">
            Aceita troca?
          </Text>
          <Text className="font-regular text-sm">
            {product.accept_trade ? "Sim" : "Não"}
          </Text>
        </View>

        <View className="mx-6 mb-6">
          <Text className="font-bold text-gray-200 text-sm mb-3">
            Meios de pagamento:
          </Text>

          {product.payment_methods.map((paymentMethod) => {
            return (
              <View
                key={paymentMethod}
                className="flex-row gap-2 mt-2 items-center"
              >
                <Text className="text-sm font-regular text-gray-200 ml-1">
                  {paymentMethod === "boleto" && "Boleto"}
                  {paymentMethod === "pix" && "Pix"}
                  {paymentMethod === "cash" && "Dinheiro"}
                  {paymentMethod === "card" && "Cartão de Crédit"}
                  {paymentMethod === "deposit" && "Depósito Bancário"}
                </Text>
              </View>
            );
          })}
        </View>

        <View className="flex-row justify-center gap-4 mt-6">
          <Button
            title="Voltar e editar"
            onPress={() =>
              navigation.navigate("newCreateProduct", { product, images })
            }
            variant="secondary"
            showIcon
            icon={<ArrowLeft size={24} color="#3E3A40" />}
            style={{ width: 170 }}
          />
          <Button
            title="Publicar"
            onPress={handleSubmitProduct}
            showIcon
            variant="primary"
            icon={<FilePlus size={24} color="#F7F7F8" />}
            style={{ width: 170 }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
