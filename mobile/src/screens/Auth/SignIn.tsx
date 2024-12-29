import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import LogoImg from "@assets/Logo.png";

import { Loading } from "src/components/Loading";
import { CustomAlertModal } from "src/components/CustomAlertModal";
import { Button } from "src/components/Button";
import { Input } from "src/components/Input";

import { AuthNavigatorRoutesProps } from "src/routes/auth.routes";

import { useAuth } from "src/hooks/useAuth";

const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email("E-mail inválido")
    .required("O e-mail é obrigatório")
    .max(255, "O e-mail é muito longo"),
  password: Yup.string()
    .required("A senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type FormDataProps = {
  email: string;
  password: string;
};

export default function SignIn() {
  const [loading, setLoading] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
    defaultValues: { email: "", password: "" },
    mode: "all",
  });

  const { singIn } = useAuth();

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleCreateAccount() {
    navigation.navigate("signUp");
  }

  async function handleSubmitSignIn({ email, password }: FormDataProps) {
    try {
      setLoading(true);
      await singIn(email, password);
    } catch (err: any) {
      setAlertVisible(true);
      setAlertMessage(err?.message ?? "Error ao fazer login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <View className="flex-1 bg-gray-700 items-center">
        {loading && <Loading />}
        {alertVisible && (
          <CustomAlertModal
            isVisible={alertVisible}
            message={alertMessage}
            onClose={() => setAlertVisible(false)}
          />
        )}
        <View className="h-[570] w-full items-center bg-gray-600 rounded-b-2xl mx-12">
          <Image
            source={LogoImg}
            alt="imagem do sistema"
            className="mt-[65] mb-5 w-24 h-12"
            resizeMode="contain"
          />

          <View className="w-[200] justify-center items-center mb-[76]">
            <Text className="text-gray-100 font-bold text-3xl">
              marketspace
            </Text>
            <Text className="text-gray-300 text-sm font-light">
              Seu espaço de compra e venda
            </Text>
          </View>

          <Text className="mb-4 text-lg font-regular text-gray-200">
            Acesse sua conta{" "}
          </Text>

          <View className="w-full mb-[68]">
            <View className="mx-12">
              <View className="mb-4">
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      keyboardType="email-address"
                      placeholder="E-mail"
                      onChangeText={onChange}
                      value={value}
                      error={errors.email?.message}
                    />
                  )}
                />
              </View>

              <View className="mb-8">
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      keyboardType="default"
                      secureTextEntry={true}
                      placeholder="Senha"
                      value={value}
                      onChangeText={onChange}
                      error={errors.password?.message}
                      onSubmitEditing={handleSubmit(handleSubmitSignIn)}
                      returnKeyType="send"
                    />
                  )}
                />
              </View>

              <View className="w-full">
                <Button
                  onPress={handleSubmit(handleSubmitSignIn)}
                  title="Entrar"
                  variant="primary"
                />
              </View>
            </View>
          </View>
        </View>
        <View className="w-full mt-[56] mx-12 ">
          <View className="w-full justify-center items-center">
            <Text className="font-sm font-regular">Ainda não tem acesso?</Text>
          </View>
          <View className="mx-12 mt-4">
            <Button
              title="Crie uma conta"
              variant="secondary"
              showIcon={true}
              onPress={handleCreateAccount}
              disabled={loading}
            />
          </View>
        </View>
      </View>
    </>
  );
}
