import * as React from "react";
import { useLocalStorage } from "../helpers";

const MainStoreContext = React.createContext();

export default function MainStoreContextProvider({ children }) {
  const [store, setStore] = useLocalStorage("app::main_store", {
    cart: {},
  });

  const cartItems = Object.values(store.cart);
  const cartLength = cartItems.length;
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);
  const cartTotal = Math.round((totalAmount + Number.EPSILON) * 100) / 100;

  const isItemInCart = (itemId) => itemId in store.cart;
  const addItemToCart = (item) =>
    setStore((prevStore) => ({
      ...prevStore,
      cart: { ...prevStore.cart, [item.id]: item },
    }));

  const removeItemFromCart = (itemId) =>
    setStore((prevStore) => {
      const newCart = { ...prevStore.cart };
      delete newCart[itemId];

      return {
        ...prevStore,
        cart: { ...newCart },
      };
    });

  const clearCart = () =>
    setStore((prevStore) => ({
      ...prevStore,
      cart: {},
    }));

  const value = {
    store,
    cartItems,
    cartTotal,
    cartLength,
    addItemToCart,
    removeItemFromCart,
    isItemInCart,
    clearCart,
  };
  return (
    <MainStoreContext.Provider value={value}>
      {children}
    </MainStoreContext.Provider>
  );
}

export function useMainStore() {
  const context = React.useContext(MainStoreContext);

  if (!context) {
    throw new Error(
      "useMainStore must be used within a <MainStoreContextProvider />"
    );
  }

  return context;
}
