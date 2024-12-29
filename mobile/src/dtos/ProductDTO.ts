import { ImageProps } from "react-native";

export type StatusProdutoProps = "NOVO" | "USADO";

export type ProductDTO = {
  id: string;
  productName: string;
  price: number;
  profileImage: ImageProps;
  status: StatusProdutoProps;
};
