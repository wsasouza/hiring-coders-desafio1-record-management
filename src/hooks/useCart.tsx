import { createContext, ReactNode, useContext, useState } from 'react';
import { api } from '../services/api';
import { Product } from '../types';

import { useToast } from "../hooks/toast";

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const { addToast } = useToast();
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@GamersWorld:cart');

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (productId: number) => {
    try {
       const updatedCart = [...cart];
       const productExists = updatedCart.find(product => product.id === productId);

       const stock = await api.get(`/stock/${productId}`);

       const stockAmount = stock.data.amount;
       const currentAmount = productExists ? productExists.amount : 0;
       const amount = currentAmount + 1;

       if (amount > stockAmount) {
          addToast({
            type: "error",
            title: "Estoque insuficiente!",
            description:
              "Não temos a quantidade solicitada disponivel no momento.",
          });
          return;
       }

       if (productExists) {
          productExists.amount = amount;
       } else {
          const product = await api.get(`/products/${productId}`);

          const newProduct = {
            ...product.data,
            amount: 1
          }

          updatedCart.push(newProduct);
       }

       setCart(updatedCart);
       localStorage.setItem('@GamersWorld:cart', JSON.stringify(updatedCart));

    } catch {
        addToast({
          type: "error",
          title: "Erro ao adicionar o produto!",
          description:
            "Caso o erro persista, contactar o administrador.",
        });
    }
  };

  const removeProduct = (productId: number) => {
    try {
       const updatedCart = [...cart];
       const productIndex = updatedCart.findIndex(product => product.id === productId);

       if (productIndex >= 0) {
          updatedCart.splice(productIndex, 1);
          setCart(updatedCart);
          localStorage.setItem('@GamersWorld:cart', JSON.stringify(updatedCart));
       } else {
          throw Error();
       }
    } catch {
        addToast({
          type: "error",
          title: "Erro ao remover o produto!",
          description:
            "Caso o erro persista, contactar o administrador.",
        });
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
       if (amount <= 0) {
         return;
       }

       const stock = await api.get(`/stock/${productId}`);

       const stockAmount = stock.data.amount;

       if (amount > stockAmount) {
          addToast({
            type: "error",
            title: "Estoque insuficiente!",
            description:
              "Não temos a quantidade solicitada disponivel no momento.",
          });        
         return;
       } 

       const updatedCart = [...cart];
       const productExists = updatedCart.find(product => product.id === productId);

       if (productExists) {
         productExists.amount = amount;
         setCart(updatedCart);
         localStorage.setItem('@GamersWorld:cart', JSON.stringify(updatedCart));
       } else {
         throw Error();
       }

    } catch {
      addToast({
        type: "error",
        title: "Erro ao adicionar o produto!",
        description:
          "Caso o erro persista, contactar o administrador.",
      });
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
