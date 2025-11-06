"use client";

import { useCart } from '@/components/CartProvider';
import type { Product } from '@/data/products';

export function AddToCartButton({ product, className }: { product: Product; className?: string }) {
  const { add } = useCart();
  return (
    <button
      onClick={() => add(product, 1)}
      className={`inline-flex items-center justify-center rounded-md bg-gray-900 text-white px-4 py-2 text-sm font-medium hover:bg-black transition-colors ${className ?? ''}`}
      aria-label={`Add ${product.title} to cart`}
    >
      Add to cart
    </button>
  );
}
