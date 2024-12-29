import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { Faders, MagnifyingGlass, X } from "phosphor-react-native";
import BottomSheet from "@gorhom/bottom-sheet";

import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "src/components/Header";
import { Sell } from "src/components/Sell";
import { Products } from "src/components/Products";
import { CustomBottomSheet } from "src/components/CustomBottomSheet";
import SquareCheckbox from "src/components/SquareCheckbox";
import Tag from "src/components/Tag";
import CheckedSwitch from "src/components/CheckedSwitch";
import { Button } from "src/components/Button";

export default function Home() {
  const [searchAnnouncement, setSearchAnnouncement] = useState("");

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [products, setProducts] = useState([
    {
      id: "1",
      status: "USADO" as const,
      price: 59.9,
      productName: "Tênis vermelho",
      profileImage: require("@assets/Image-1.png"),
    },
    {
      id: "2",
      status: "NOVO" as const,
      price: 79.9,
      productName: "Camiseta azul",
      profileImage: require("@assets/Image-2.png"),
    },
    {
      id: "3",
      status: "NOVO" as const,
      price: 79.9,
      productName: "Camiseta azul",
      profileImage: require("@assets/Image-3.png"),
    },
    {
      id: "4",
      status: "NOVO" as const,
      price: 79.9,
      productName: "Camiseta azul",
      profileImage: require("@assets/Image-4.png"),
    },
    {
      id: "5",
      status: "NOVO" as const,
      price: 79.9,
      productName: "Camiseta azul",
      profileImage: require("@assets/Image-5.png"),
    },
    {
      id: "6",
      status: "NOVO" as const,
      price: 79.9,
      productName: "Camiseta azul",
      profileImage: require("@assets/Image-6.png"),
    },
    {
      id: "7",
      status: "NOVO" as const,
      price: 79.9,
      productName: "Camiseta azul",
      profileImage: require("@assets/Image-1.png"),
    },
    {
      id: "8",
      status: "NOVO" as const,
      price: 120,
      productName: "Camiseta azul",
      profileImage: require("@assets/Image-2.png"),
    },
  ]);

  function openBottomSheet() {
    bottomSheetRef.current?.expand();
  }

  function handleCloseBottonSheet() {
    bottomSheetRef.current?.collapse();
  }

  return (
    <SafeAreaView>
      <View className="w-full h-full px-6 bg-gray-600">
        <Header onPressBottomSheet={openBottomSheet} />

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
                placeholderTextColor={"#9F9BA1"}
                value={searchAnnouncement}
                className="text-base font-regular text-gray-100"
                onChangeText={setSearchAnnouncement}
              />
            </View>
            <View className="flex-row gap-3">
              <MagnifyingGlass weight="bold" color="#3E3A40" size={20} />
              <View className="h-[18] w-[1] bg-gray-400"></View>
              <TouchableOpacity onPress={() => console.log("filtro")}>
                <Faders weight="bold" color="#3E3A40" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Products data={products} />

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
            <Tag active label="USADO" onToggle={() => console.log()} />
            <Tag label="NOVO" active={false} onToggle={() => console.log()} />
          </View>

          <View className="w-full mb-6">
            <Text className="mt-6 text-sm font-bold">Aceita troca?</Text>
            <View className="mt-2">
              <CheckedSwitch checked onToggle={() => console.log()} />
            </View>
          </View>

          <View className="w-full">
            <Text className="font-bold text-sm text-gray-200">
              Meios de pagamento aceitos
            </Text>

            <View className="flex-row gap-2 items-center mt-4">
              <SquareCheckbox checked onToggle={() => console.log()} />
              <Text>Boleto</Text>
            </View>

            <View className="flex-row gap-2 items-center mt-4">
              <SquareCheckbox checked onToggle={() => console.log()} />
              <Text>Pix</Text>
            </View>

            <View className="flex-row gap-2 items-center mt-4">
              <SquareCheckbox checked onToggle={() => console.log()} />
              <Text>Dinheiro</Text>
            </View>

            <View className="flex-row gap-2 items-center mt-4">
              <SquareCheckbox checked onToggle={() => console.log()} />
              <Text>Cartão de Crédito</Text>
            </View>

            <View className="flex-row gap-2 items-center mt-4">
              <SquareCheckbox checked onToggle={() => console.log()} />
              <Text>Depósito Bancário</Text>
            </View>
          </View>

          <View className="flex-row justify-between items-center mt-16">
            <View style={{ width: 157 }}>
              <Button
                title="Resetar filtros"
                variant="secondary"
                onPress={() => console.log("Resetar filtros")}
              />
            </View>
            <View style={{ width: 157 }}>
              <Button
                title="Aplicar filtros"
                onPress={() => console.log("Aplicar filtros")}
              />
            </View>
          </View>
        </CustomBottomSheet>
      </View>
    </SafeAreaView>
  );
}
