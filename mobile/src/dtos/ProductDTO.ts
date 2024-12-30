export type ProductDTO = {
  id: string;
  name: string;
  price: number;
  description: string;
  is_new: Boolean;
  accept_trade: Boolean;
  user_id: string;
  is_active: Boolean;
  payment_methods: string[];
};

export type ProductMyProps = {
  accept_trade: boolean;
  description: string;
  id: string;
  is_active: boolean;
  is_new: boolean;
  name: string;
  price: number;
  product_images: ProductImage[];
  user_id: string;
  user?: User;
};

export interface ProductDetailsDTO {
  accept_trade: boolean;
  description: string;
  id: string;
  is_active: boolean;
  is_new: boolean;
  name: string;
  payment_methods: PaymentMethod[];
  price: number;
  product_images: ProductImage[];
  user: User;
  user_id: string;
}

export interface PaymentMethod {
  key: string;
  name: string;
}

export interface ProductImage {
  id: string;
  path: string;
}

export interface User {
  avatar: string;
  name: string;
  tel: string;
}
