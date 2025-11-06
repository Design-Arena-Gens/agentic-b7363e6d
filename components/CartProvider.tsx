"use client";

import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import type { Product } from '@/data/products';

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: 'ADD'; product: Product; quantity?: number }
  | { type: 'REMOVE'; productId: string }
  | { type: 'SET_QTY'; productId: string; quantity: number }
  | { type: 'RESET' }
  | { type: 'HYDRATE'; state: CartState };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const quantityToAdd = action.quantity ?? 1;
      const existing = state.items.find((i) => i.product.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id ? { ...i, quantity: i.quantity + quantityToAdd } : i
          ),
        };
      }
      return { items: [...state.items, { product: action.product, quantity: quantityToAdd }] };
    }
    case 'REMOVE':
      return { items: state.items.filter((i) => i.product.id !== action.productId) };
    case 'SET_QTY':
      return {
        items: state.items
          .map((i) => (i.product.id === action.productId ? { ...i, quantity: action.quantity } : i))
          .filter((i) => i.quantity > 0),
      };
    case 'RESET':
      return { items: [] };
    case 'HYDRATE':
      return action.state;
    default:
      return state;
  }
}

const CartContext = createContext<{
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (product: Product, quantity?: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  reset: () => void;
} | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('clothify_cart');
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        dispatch({ type: 'HYDRATE', state: parsed });
      }
    } catch {}
  }, []);

  // persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('clothify_cart', JSON.stringify(state));
    } catch {}
  }, [state]);

  const value = useMemo(() => {
    const count = state.items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = state.items.reduce((sum, i) => sum + i.quantity * i.product.price, 0);
    return {
      items: state.items,
      count,
      subtotal,
      add: (product: Product, quantity?: number) => dispatch({ type: 'ADD', product, quantity }),
      remove: (productId: string) => dispatch({ type: 'REMOVE', productId }),
      setQuantity: (productId: string, quantity: number) => dispatch({ type: 'SET_QTY', productId, quantity }),
      reset: () => dispatch({ type: 'RESET' }),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
