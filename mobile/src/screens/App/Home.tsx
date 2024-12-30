import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Faders, MagnifyingGlass, X } from "phosphor-react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { Header } from "src/components/Header";
import { Sell } from "src/components/Sell";
import { Products } from "src/components/Products";
import { CustomBottomSheet } from "src/components/CustomBottomSheet";
import SquareCheckbox from "src/components/SquareCheckbox";
import Tag from "src/components/Tag";
import CheckedSwitch from "src/components/CheckedSwitch";
import { Button } from "src/components/Button";

import { AppNavigatorRoutesProps } from "src/routes/app.routes";
import { api } from "src/services/api";

type FormPropsQuery = {
  searchAnnouncement: string;
  isNew: boolean | undefined;
  acceptTrade: boolean | undefined;
  paymentMethods: Array<string>;
};

export default function Home() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [products, setProducts] = useState([]);
  const [searchAnnouncement, setSearchAnnouncement] = useState<string>("");
  const [isNew, setIsNew] = useState<boolean | undefined>(undefined);
  const [acceptTrade, setAcceptTrade] = useState<boolean | undefined>(
    undefined
  );
  const [paymentMethods, setPaymentMethods] = useState<Array<string>>([]);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const openBottomSheet = () => bottomSheetRef.current?.expand();
  const handleCloseBottonSheet = () => bottomSheetRef.current?.collapse();

  const handleNewAds = () =>
    navigation.navigate("newCreateProduct", { product: null, images: [] });

  const handleResetFilters = () => {
    setSearchAnnouncement("");
    setIsNew(undefined);
    setAcceptTrade(undefined);
    setPaymentMethods([]);
  };

  const [conditionTags, setConditionTags] = useState<
    { label: string; active: boolean | undefined }[]
  >([
    { label: "USADO", active: undefined },
    { label: "NOVO", active: undefined },
  ]);

  const handleToggleTag = (label: string) => {
    setConditionTags((prevTags) =>
      prevTags.map((tag) =>
        tag.label === label
          ? { ...tag, active: true }
          : { ...tag, active: false }
      )
    );
  };

  async function handleApplyFilters() {
    handleSearch();
    handleCloseBottonSheet();
  }

  const paymentOptions = [
    { key: "boleto", value: "Boleto" },
    { key: "pix", value: "Pix" },
    { key: "cash", value: "Dinheiro" },
    { key: "card", value: "Cartão de Crédito" },
    { key: "deposit", value: "Depósito Bancário" },
  ];

  async function handleSearch() {
    const queryParams = new URLSearchParams();

    if (searchAnnouncement) queryParams.append("query", searchAnnouncement);
    if (isNew !== undefined)
      queryParams.append("is_new", isNew ? "true" : "false");
    if (acceptTrade !== undefined)
      queryParams.append("accept_trade", acceptTrade ? "true" : "false");
    if (paymentMethods.length > 0)
      queryParams.append("payment_methods", paymentMethods.join(","));

    const { data } = await api.get(`/products/?${queryParams.toString()}`);

    setProducts(data);
  }

  useEffect(() => {
    handleSearch();
  }, [searchAnnouncement, isNew, acceptTrade, paymentMethods]);

  return (
    <SafeAreaView>
      <View className="w-full h-full px-6 bg-gray-600">
        <Header onPress={handleNewAds} />

        <View className="mt-6">
          <Text className="text-gray-300">
            Seus produtos anunciados para venda
          </Text>
          <Sell />
        </View>

        <View className="mt-8">
          <Text className="mb-3 text-gray-300 font-regular text-sm">
            Compre produtos variados
          </Text>
          <View className="w-full bg-gray-700 flex-row justify-center items-center rounded-md px-4 py-3">
            <View className="flex-1">
              <TextInput
                placeholder="Buscar anúncio"
                placeholderTextColor="#9F9BA1"
                value={searchAnnouncement}
                className="text-base font-regular text-gray-100"
                onChangeText={setSearchAnnouncement}
              />
            </View>
            <View className="flex-row gap-3">
              <MagnifyingGlass weight="bold" color="#3E3A40" size={20} />
              <View className="h-[18] w-[1] bg-gray-400"></View>
              <TouchableOpacity onPress={openBottomSheet}>
                <Faders weight="bold" color="#3E3A40" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Products data={products} showContact={true} />

        <CustomBottomSheet ref={bottomSheetRef}>
          <View className="flex-row justify-between items-center -mr-7 mb-6">
            <Text className="font-bold text-xl text-gray-100">
              Filtrar anúncios
            </Text>
            <TouchableOpacity
              className="p-1 mr-10"
              onPress={handleCloseBottonSheet}
            >
              <X size={20} color="#9F9BA1" />
            </TouchableOpacity>
          </View>

          <View className="w-full">
            <Text className="font-bold text-sm text-gray-200">Condição</Text>
          </View>
          <View className="flex-row mt-3 gap-2">
            {conditionTags.map((tag) => (
              <Tag
                key={tag.label}
                active={tag.active} // Usando 'undefined', 'true' ou 'false'
                label={tag.label}
                onToggle={() => handleToggleTag(tag.label)} // Chama a função de alternância ao clicar
              />
            ))}
          </View>

          <View className="w-full mb-6">
            <Text className="mt-6 text-sm font-bold">Aceita troca?</Text>
            <View className="mt-2">
              <CheckedSwitch
                checked={acceptTrade}
                onToggle={() => setAcceptTrade((prev) => !prev)}
              />
            </View>
          </View>

          <View className="w-full">
            <Text className="font-bold text-sm text-gray-200">
              Meios de pagamento aceitos
            </Text>
            {paymentOptions.map((method) => (
              <View
                key={method.key}
                className="flex-row gap-2 items-center mt-4"
              >
                <SquareCheckbox
                  checked={paymentMethods.includes(method.key)}
                  onToggle={() => {
                    const newPaymentMethods = paymentMethods.includes(
                      method.key
                    )
                      ? paymentMethods.filter(
                          (methodKey) => methodKey !== method.key
                        )
                      : [...paymentMethods, method.key];
                    setPaymentMethods(newPaymentMethods);
                  }}
                />
                <Text>{method.value}</Text>
              </View>
            ))}
          </View>

          <View className="flex-row justify-between items-center mt-16">
            <View style={{ width: 157 }}>
              <Button
                title="Resetar filtros"
                variant="secondary"
                onPress={handleResetFilters}
              />
            </View>
            <View style={{ width: 157 }}>
              <Button title="Aplicar filtros" onPress={handleApplyFilters} />
            </View>
          </View>
        </CustomBottomSheet>
      </View>
    </SafeAreaView>
  );
}
