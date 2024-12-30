import React, { useState } from "react";
import { View, Text, Image, ScrollView, Pressable } from "react-native";
import { PencilSimpleLine, User } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { api } from "src/services/api";

import { useAuth } from "src/hooks/useAuth";

import LogoImg from "@assets/Logo.png";

import { Input } from "src/components/Input";
import { Button } from "src/components/Button";
import { CustomAlertModal } from "src/components/CustomAlertModal";

import { AuthNavigatorRoutesProps } from "src/routes/auth.routes";

const signUpSchema = Yup.object().shape({
  name: Yup.string().required("O nome é obrigatório"),
  email: Yup.string()
    .email("E-mail inválido")
    .required("O e-mail é obrigatório"),
  tel: Yup.string().required("O telefone é obrigatório"),
  password: Yup.string()
    .required("A senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
  password_confirm: Yup.string()
    .required("Confirmar senha é obrigatório")
    .oneOf([Yup.ref("password"), ""], "As senhas não coincidem"),
});

type FormData = {
  name: string;
  email: string;
  tel: string;
  password: string;
  password_confirm: string;
};

interface UriProps {
  uri: string;
}

export default function SignUp() {
  const { singIn } = useAuth();

  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<UriProps | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      tel: "",
      password: "",
      password_confirm: "",
    },
    mode: "all",
  });

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleSignIn() {
    navigation.navigate("signIn");
  }

  async function handleSubmitSignUp(data: FormData) {
    try {
      setLoading(true);

      if (!avatar) {
        alert("Selecione uma imagem de avatar antes de prosseguir.");
        return;
      }

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("tel", data.tel);
      formData.append("password", data.password);
      formData.append("avatar", {
        uri: avatar.uri,
        type: "image/jpeg",
        name: "avatar.jpg",
      } as any);

      await api.post("/users/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await singIn(data.email, data.password);

      reset();
    } catch (error: any) {
      setAlertVisible(true);
      setAlertMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleTakeImageAvatar() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) return;
    const selectedUri = result.assets[0].uri;

    const fileInfo = (await FileSystem.getInfoAsync(selectedUri)) as {
      size: number;
    };

    if (fileInfo.size && fileInfo.size > 5 * 1024 * 1024) {
      alert(
        "O arquivo selecionado excede o limite de 5 MB. Escolha uma imagem menor."
      );
      return;
    }
    setAvatar({ uri: selectedUri });
  }

  return (
    <SafeAreaView>
      <View className="h-full w-full bg-gray-600">
        <ScrollView
          style={{ flex: 1, width: "100%" }}
          showsVerticalScrollIndicator={false}
        >
          {alertVisible && (
            <CustomAlertModal
              isVisible={alertVisible}
              message={alertMessage}
              onClose={() => setAlertVisible(!alertVisible)}
            />
          )}
          <View className="w-full mt-10 justify-center items-center">
            <Image
              source={LogoImg}
              alt="imagem do sistema"
              className="w-16 h-10 mt-5"
              resizeMode="contain"
            />
            <Text className="mt-5 text-center font-bold text-xl">
              Boas vindas!
            </Text>
            <Text className="mx-12 text-center mt-2 font-regular text-sm">
              Crie sua conta e use o espaço para comprar itens variados e vender
              seus produtos
            </Text>
          </View>

          <View className="mt-8 justify-center items-center mb-4">
            <View className="w-[88px] h-[88px] rounded-full items-center justify-center border-[3px] border-blue-600 bg-gray-500 relative">
              {avatar ? (
                <Image
                  source={{ uri: avatar.uri }}
                  alt="imagem do avatar"
                  className="w-full h-full rounded-full"
                />
              ) : (
                <User size={48} color="#ababac" />
              )}
              <Pressable
                onPress={handleTakeImageAvatar}
                className="w-10 h-10 rounded-full bg-blue-600 absolute bottom-0 right-0 items-center justify-center"
              >
                <PencilSimpleLine size={20} color="#FFF" />
              </Pressable>
            </View>
          </View>

          <View className="mx-12">
            <View className="mb-8">
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <Input
                    keyboardType="default"
                    placeholder="Nome"
                    secureTextEntry={false}
                    onChangeText={onChange}
                    value={value}
                    error={errors.name?.message}
                  />
                )}
              />
            </View>

            <View className="mb-8">
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
                name="tel"
                render={({ field: { onChange, value } }) => (
                  <Input
                    keyboardType="default"
                    placeholder="Telefone"
                    onChangeText={onChange}
                    value={value}
                    error={errors.tel?.message}
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
                    onChangeText={onChange}
                    value={value}
                    error={errors.password?.message}
                  />
                )}
              />
            </View>
            <View className="mb-8">
              <Controller
                control={control}
                name="password_confirm"
                render={({ field: { onChange, value } }) => (
                  <Input
                    keyboardType="default"
                    secureTextEntry={true}
                    placeholder="Confirmar senha"
                    onChangeText={onChange}
                    value={value}
                    error={errors.password_confirm?.message}
                  />
                )}
              />
            </View>

            <View className="w-full mt-6 mb-12">
              <Button
                onPress={handleSubmit(handleSubmitSignUp)}
                title="Criar"
                variant="dark"
                disabled={loading}
              />
            </View>

            <View className="w-full mt-6 mb-12 justify-center items-center">
              <Text className="text-gray-200 text-sm font-regular text-center ">
                Já tem uma conta?
              </Text>

              <View className="w-full mt-4 mb-12">
                <Button
                  onPress={handleSignIn}
                  disabled={loading}
                  title="Ir para o login"
                  variant="secondary"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
