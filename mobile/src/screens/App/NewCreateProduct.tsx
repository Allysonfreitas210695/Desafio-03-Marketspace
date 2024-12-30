import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { ArrowLeft } from "phosphor-react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { AppNavigatorRoutesProps } from "src/routes/app.routes";

import { Input } from "src/components/Input";
import RoundedCheckbox from "src/components/RoundedCheckbox";
import CheckedSwitch from "src/components/CheckedSwitch";
import SquareCheckbox from "src/components/SquareCheckbox";
import { ImagesProduct } from "src/components/ImagesProduct";
import { Button } from "src/components/Button";
import { ProductDTO } from "src/dtos/ProductDTO";
import { CustomAlertModal } from "src/components/CustomAlertModal";

const schema = Yup.object().shape({
  title: Yup.string().required("Título é obrigatório"),
  description: Yup.string().required("Descrição é obrigatória"),
  is_new: Yup.boolean().required(
    "É obrigatório informar se o produto é novo ou usado"
  ),
  price: Yup.number()
    .required("Preço é obrigatório")
    .positive("Preço deve ser um valor positivo"),
  accept_trade: Yup.boolean(),
  payment_methods: Yup.array()
    .min(1, "Selecione pelo menos um meio de pagamento")
    .required("Meios de pagamento são obrigatórios"),
});

type FormDataProps = {
  title: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade?: boolean;
  payment_methods: string[];
};

type ParamsProps = {
  product?: ProductDTO;
  images?: string[];
};

export default function NewCreateProduct() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const router = useRoute();
  const { product, images } = router.params as ParamsProps;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(schema),
  });

  const [paymentMethods, setPaymentMethods] = useState<string[]>([]);

  const paymentOptions = [
    { key: "boleto", value: "Boleto" },
    { key: "pix", value: "Pix" },
    { key: "cash", value: "Dinheiro" },
    { key: "card", value: "Cartão de Crédito" },
    { key: "deposit", value: "Depósito Bancário" },
  ];

  const togglePaymentMethod = useCallback((methodKey: string) => {
    setPaymentMethods((prevMethods) =>
      prevMethods.includes(methodKey)
        ? prevMethods.filter((m) => m !== methodKey)
        : [...prevMethods, methodKey]
    );
  }, []);

  const handleAddImage = (uri: string) => {
    setSelectedImages((prevImages) => [...prevImages, uri]);
  };

  const handleRemoveImage = (uri: string) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((image) => image !== uri)
    );
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePreview = (data: FormDataProps) => {
    if (selectedImages.length === 0) {
      setAlertVisible(true);
      setAlertMessage("É necessário adicionar ao menos uma imagem");
      return;
    }

    const _product = { ...data };
    const _images = [...selectedImages];

    reset();
    setSelectedImages([]);

    navigation.navigate("previewProduct", {
      product: {
        accept_trade: _product.accept_trade,
        description: _product.description,
        id: "",
        is_new: _product.is_new,
        name: _product.title,
        payment_methods: _product.payment_methods,
        price: _product.price,
        is_active: false,
        user_id: "",
      } as ProductDTO,
      images: _images,
    });
  };

  useFocusEffect(
    useCallback(() => {
      if (product) {
        reset({
          title: product?.name,
          description: product?.description,
          is_new: product?.is_new === true,
          price: product?.price,
          accept_trade: product?.accept_trade === true,
          payment_methods: product?.payment_methods,
        });
      }

      if (images && images.length > 0) {
        setSelectedImages(images);
      }

      if (!product || !images) {
        reset({
          title: "",
          description: "",
          is_new: undefined,
          price: undefined,
          accept_trade: false,
          payment_methods: [],
        });
        setPaymentMethods([]);
        setSelectedImages([]);
      }
    }, [product, images, reset])
  );

  return (
    <SafeAreaView>
      <ScrollView
        style={{ flexGrow: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 mt-5">
          {alertVisible && (
            <CustomAlertModal
              message={alertMessage}
              isVisible={alertVisible}
              onClose={() => setAlertVisible(!alertVisible)}
            />
          )}

          <View className="flex-row justify-between items-center relative mb-6">
            <Text className="w-full text-center text-xl font-bold text-gray-100">
              Criar anúncio
            </Text>
            <TouchableOpacity
              onPress={handleGoBack}
              className="p-1 absolute -left-2 ft-0"
            >
              <ArrowLeft color="#1A181B" size={24} />
            </TouchableOpacity>
          </View>

          <Text className="font-bold text-gray-200 text-base mb-1">
            Imagens
          </Text>
          <Text className="font-regular text-sm text-gray-300 mb-4">
            Escolha até 3 imagens para mostrar o quanto o seu produto é
            incrível!
          </Text>

          <ImagesProduct
            selectedImages={selectedImages}
            onAddImage={handleAddImage}
            onRemoveImage={handleRemoveImage}
          />

          <Text className="font-bold text-base text-gray-200 mb-4">
            Sobre o produto
          </Text>
          <View className="mb-8">
            <View className="mb-4">
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <Input
                    placeholder="Título do anúncio"
                    value={field.value}
                    onChangeText={field.onChange}
                    style={{ paddingHorizontal: 16 }}
                    error={errors.title?.message}
                  />
                )}
              />
            </View>
            <View className="mb-4">
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <Input
                    placeholder="Descrição do produto"
                    value={field.value}
                    onChangeText={field.onChange}
                    style={{ height: 100, textAlignVertical: "top" }}
                    multiline={true}
                    numberOfLines={4}
                    error={errors.description?.message}
                  />
                )}
              />
            </View>
            <View className="mb-4 flex-row gap-5 items-center">
              <View className="flex-row items-center gap-3">
                <Controller
                  control={control}
                  name="is_new"
                  render={({ field }) => (
                    <RoundedCheckbox
                      checked={field.value === true}
                      onToggle={() => field.onChange(true)}
                    />
                  )}
                />
                <Text>Produto novo</Text>
              </View>
              <View className="flex-row items-center gap-4">
                <Controller
                  control={control}
                  name="is_new"
                  render={({ field }) => (
                    <RoundedCheckbox
                      checked={field.value === false}
                      onToggle={() => field.onChange(false)}
                    />
                  )}
                />
                <Text>Produto usado</Text>
              </View>
            </View>
            {errors.is_new && (
              <Text className="text-red-500 mt-1 text-sm font-light">
                {errors.is_new.message}
              </Text>
            )}
          </View>

          <Text className="text-gray-200 text-base font-bold">Venda</Text>
          <View className="w-full mt-4 mb-4">
            <Controller
              control={control}
              name="price"
              render={({ field }) => (
                <Input
                  keyboardType="numeric"
                  placeholder="R$"
                  value={field.value?.toString() || ""}
                  onChangeText={field.onChange}
                  style={{ paddingHorizontal: 16 }}
                  error={errors.price?.message}
                />
              )}
            />
          </View>

          <Text className="text-gray-200 text-sm font-bold mb-3">
            Aceita troca?
          </Text>
          <Controller
            control={control}
            name="accept_trade"
            render={({ field }) => (
              <CheckedSwitch
                checked={field.value}
                onToggle={() => field.onChange(!field.value)}
              />
            )}
          />

          <Text className="text-gray-200 text-sm font-bold mb-3 mt-4">
            Meios de pagamento aceitos
          </Text>
          <View className="mt-4">
            <Controller
              control={control}
              name="payment_methods"
              render={({ field }) => (
                <View>
                  {paymentOptions.map(({ key, value }) => (
                    <View
                      key={key}
                      className="flex-row items-center gap-3 mb-3"
                    >
                      <SquareCheckbox
                        onToggle={() => {
                          togglePaymentMethod(key);
                          field.onChange(paymentMethods);
                        }}
                        checked={paymentMethods.includes(key)}
                      />
                      <Text className="text-gray-200">{value}</Text>
                    </View>
                  ))}
                  {errors.payment_methods && (
                    <Text className="text-red-500 mt-1 text-sm font-light">
                      {errors.payment_methods.message}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>

          <View className="flex-row gap-3 mt-6">
            <Button
              onPress={handleGoBack}
              title="Cancelar"
              variant="secondary"
              style={{ width: 170 }}
            />
            <Button
              onPress={handleSubmit(handlePreview)}
              title="Avançar"
              style={{ width: 170 }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
