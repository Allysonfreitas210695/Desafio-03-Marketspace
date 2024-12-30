import React, { useCallback, useState } from "react";
import { Image, Linking, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  Barcode,
  CreditCard,
  NoteBlank,
  Power,
  QrCode,
  TrashSimple,
  WhatsappLogo,
} from "phosphor-react-native";

import { AppNavigatorRoutesProps } from "src/routes/app.routes";

import { api } from "src/services/api";

import { useAuth } from "src/hooks/useAuth";

import { ProductDetailsDTO } from "src/dtos/ProductDTO";

import { HeaderDetails } from "src/components/HeaderDetails";
import ImageCarousel from "src/components/ImageCarousel";
import { Button } from "src/components/Button";
import { Loading } from "src/components/Loading";

type ParamsProps = {
  id: string;
  showContact?: boolean;
};

export default function DetailsMyProduct() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ProductDetailsDTO | null>(null);

  const router = useRoute();
  const { id, showContact } = router.params as ParamsProps;

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  if (!id) navigation.goBack();

  function handleGoBack() {
    navigation.navigate("myProducts");
  }

  async function fetchProduct() {
    try {
      setLoading(true);
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
    } catch (e) {
      console.log("Failed to load");
    } finally {
      setLoading(false);
    }
  }

  async function handleRemoveProduct() {
    try {
      setLoading(true);
      await api.delete(`/products/${id}`);
      navigation.goBack();
    } catch (e) {
      console.log("Failed to delete");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateStatusProduct() {
    try {
      setLoading(true);
      await api.patch(`/products/${id}`, { is_active: !product?.is_active });
      await fetchProduct();
    } catch (e) {
      console.log("Failed to update status");
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchProduct();
    }, [])
  );

  return (
    <SafeAreaView className="h-full w-full">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {loading && <Loading />}
        {!loading && product && (
          <View className="flex-1 mb-10">
            <HeaderDetails
              handleGoBack={handleGoBack}
              handleEditAds={() => console.log("editando")}
              showContact
            />

            <View className="mt-5 w-full mb-10">
              <View className="w-full">
                <ImageCarousel
                  images={
                    product?.product_images && product.product_images.length > 0
                      ? product.product_images.map(({ path }) => ({
                          uri: `${api.defaults.baseURL}/images/${path}`,
                        }))
                      : []
                  }
                  isActive={product.is_active}
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
                      uri: `${api.defaults.baseURL}/images/${product?.user.avatar}`,
                    }}
                    style={{ width: "100%", height: "100%", borderRadius: 50 }}
                    alt="imagem do perfil"
                    resizeMode="cover"
                  />
                </View>
                <Text className="font-regular text-sm text-gray-100">
                  {product?.user.name}
                </Text>
              </View>
            </View>

            <Text className="mx-6 mt-5 mb-[10] py-3 px-2 w-20 text-xs text-gray-200 font-bold text-center rounded-full bg-gray-500">
              {product?.is_new === true ? "NOVO" : "USADO"}
            </Text>

            <View className="mx-6  mb-2 flex-row justify-between items-center">
              <Text className="font-bold text-xl text-gray-100">
                {product?.name}
              </Text>
              <Text className="font-bold text-sm text-blue-600 py-1">
                R${" "}
                <Text className="text-xl ">
                  {product?.price?.toFixed(2).replace(".", ",")}
                </Text>
              </Text>
            </View>

            <View className="mx-6 mb-6">
              <Text className="font-regular text-sm text-start text-gray-200">
                {product?.description}
              </Text>
            </View>

            <View className="mx-6 flex-row mb-4">
              <Text className="font-bold text-gray-200 text-sm mr-3">
                Aceita troca?
              </Text>
              <Text className="font-regular text-sm">
                {product?.accept_trade ? "Sim" : "Não"}
              </Text>
            </View>

            <View className="mx-6 mb-6">
              <Text className="font-bold text-gray-200 text-sm mr-3">
                Meios de pagamento:
              </Text>

              <View className="gap-2 mt-2">
                {product.payment_methods.map((paymentMethod, index) => {
                  return (
                    <View key={index} className="flex-row items-center">
                      {paymentMethod.key === "boleto" && (
                        <Barcode size={20} color="#1A181B" />
                      )}
                      {paymentMethod.key === "pix" && (
                        <QrCode size={20} color="#1A181B" />
                      )}
                      {paymentMethod.key === "deposit" && (
                        <NoteBlank size={20} color="#1A181B" />
                      )}
                      {paymentMethod.key === "cash" && (
                        <NoteBlank size={20} color="#1A181B" />
                      )}
                      {paymentMethod.key === "card" && (
                        <CreditCard size={20} color="#1A181B" />
                      )}
                      <Text className="text-sm font-regular text-gray-200 ml-1">
                        {paymentMethod.key === "boleto" && "Boleto"}
                        {paymentMethod.key === "pix" && "Pix"}
                        {paymentMethod.key === "cash" && "Dinheiro"}
                        {paymentMethod.key === "card" && "Cartão de Crédit"}
                        {paymentMethod.key === "deposit" && "Depósito Bancário"}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {!showContact && (
              <View className="mx-6 gap-3">
                <Button
                  title={
                    product?.is_active
                      ? "Desativar anúncio"
                      : "Reativar anúncio"
                  }
                  variant={product?.is_active ? "dark" : "primary"}
                  showIcon
                  icon={<Power size={20} color="#FFF" />}
                  onPress={handleUpdateStatusProduct}
                />
                <Button
                  title="Excluir anúncio"
                  variant="secondary"
                  showIcon
                  icon={<TrashSimple size={20} color="#5F5B62" />}
                  onPress={handleRemoveProduct}
                />
              </View>
            )}

            {showContact && (
              <View className="flex-1 mx-6 gap-14 flex-row items-center justify-center">
                <Text className="py-2 font-bold text-blue-600 text-sm mr-4 flex-shrink-0">
                  R${" "}
                  <Text className="text-2xl font-bold">
                    {product.price.toFixed(2).replace(".", ",")}
                  </Text>
                </Text>
                <Button
                  title="Entrar em contato"
                  onPress={() => {
                    const phoneNumber = user?.tel;
                    const message = "Olá, estou interessado no produto!";
                    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                    Linking.openURL(whatsappUrl).catch((err) =>
                      console.error("Erro ao abrir WhatsApp", err)
                    );
                  }}
                  variant="primary"
                  showIcon
                  icon={<WhatsappLogo size={20} color="#FFF" />}
                  style={{ flex: 1 }}
                />
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
