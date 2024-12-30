import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Plus } from "phosphor-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "src/routes/app.routes";
import { api } from "src/services/api";

import { ProductMyProps } from "src/dtos/ProductDTO";

import Select from "src/components/Select";
import { Products } from "src/components/Products";
import { Loading } from "src/components/Loading";

export default function MyProducts() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductMyProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductMyProps[]>(
    []
  );
  const [selected, setSelected] = useState("Todos");

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  async function fetchMyProducts() {
    try {
      setLoading(true);
      const { data } = await api.get("/users/products");
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchMyProducts();
    }, [])
  );

  useEffect(() => {
    const filteredProducts = products.filter(
      (product) =>
        selected === "Todos" ||
        (selected === "Ativos" && product.is_active) ||
        (selected === "Inativos" && !product.is_active)
    );
    setFilteredProducts(filteredProducts);
  }, [selected]);

  return (
    <SafeAreaView>
      <View className="w-full h-full">
        {loading && <Loading />}
        <View className="mb-8 w-full flex-row items-center mt-5 relative">
          <Text className="font-bold w-full text-gray-100 text-xl text-center">
            Meus anúncios
          </Text>
          <TouchableOpacity
            className="absolute right-3 p-2 rounded-full"
            onPress={() =>
              navigation.navigate("newCreateProduct", {
                product: null,
                images: [],
              })
            }
          >
            <Plus color="#1A181B" size={20} />
          </TouchableOpacity>
        </View>

        <View className="mx-6 flex-row justify-between items-center">
          <Text className="font-regular text-gray-200 text-sn">
            {products.length} anúncios
          </Text>
          <View className="flex-grow items-end">
            <Select
              selected={selected}
              onChangeSelected={(item) => setSelected(item)}
              options={["Todos", "Ativos", "Inativos"]}
            />
          </View>
        </View>

        <View className="flex-1 mx-6 mt-7 h-full">
          <Products data={filteredProducts} />
        </View>
      </View>
    </SafeAreaView>
  );
}
