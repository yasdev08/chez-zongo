"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
} from "react";

// ── Types ─────────────────────────────────────────────────────

export type CartItem = {
  cartKey: string; // Unique key (itemId + options)
  id: string; // Original menu item ID
  name: string;
  price: number; // Base price (0 when unknown)
  totalPrice: number; // Price with options/extras (0 when unknown)
  priceUnknown?: boolean; // true when item has no confirmed price
  image?: string;
  quantity: number;
  selectedOptions: Record<string, string>; // optionGroupId → choiceLabel
  selectedExtras: string[]; // Extra labels
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string } // cartKey
  | { type: "UPDATE_QTY"; payload: { cartKey: string; quantity: number } }
  | { type: "CLEAR" }
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "TOGGLE" };

// ── Reducer ───────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) => i.cartKey === action.payload.cartKey
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.cartKey === action.payload.cartKey
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.cartKey !== action.payload),
      };
    case "UPDATE_QTY": {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (i) => i.cartKey !== action.payload.cartKey
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.cartKey === action.payload.cartKey
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    }
    case "CLEAR":
      return { ...state, items: [] };
    case "OPEN":
      return { ...state, isOpen: true };
    case "CLOSE":
      return { ...state, isOpen: false };
    case "TOGGLE":
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
}

// ── Context ───────────────────────────────────────────────────

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (cartKey: string) => void;
  updateQty: (cartKey: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  });

  const addItem = useCallback(
    (item: CartItem) => dispatch({ type: "ADD_ITEM", payload: item }),
    []
  );
  const removeItem = useCallback(
    (cartKey: string) => dispatch({ type: "REMOVE_ITEM", payload: cartKey }),
    []
  );
  const updateQty = useCallback(
    (cartKey: string, quantity: number) =>
      dispatch({ type: "UPDATE_QTY", payload: { cartKey, quantity } }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);
  const openCart = useCallback(() => dispatch({ type: "OPEN" }), []);
  const closeCart = useCallback(() => dispatch({ type: "CLOSE" }), []);
  const toggleCart = useCallback(() => dispatch({ type: "TOGGLE" }), []);

  const totalItems = useMemo(
    () => state.items.reduce((sum, i) => sum + i.quantity, 0),
    [state.items]
  );

  const totalPrice = useMemo(
    () =>
      state.items.reduce((sum, i) => sum + i.totalPrice * i.quantity, 0),
    [state.items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      isOpen: state.isOpen,
      totalItems,
      totalPrice,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
    }),
    [
      state.items,
      state.isOpen,
      totalItems,
      totalPrice,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
