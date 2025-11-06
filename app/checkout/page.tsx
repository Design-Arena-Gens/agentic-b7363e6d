"use client";

import Link from 'next/link';
import { useCart } from '@/components/CartProvider';

export default function CheckoutPage() {
  const { items, subtotal, reset } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-24">
        <h1 className="text-2xl font-semibold">Nothing to checkout yet</h1>
        <Link href="/" className="inline-flex mt-6 rounded-md bg-gray-900 text-white px-4 py-2 text-sm font-medium hover:bg-black">Back to shop</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
      <div className="border rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span>Items</span>
          <span>{items.reduce((s, i) => s + i.quantity, 0)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Estimated Total</span>
          <span className="text-xl font-bold">${subtotal.toFixed(2)}</span>
        </div>
        <button
          onClick={() => {
            // simulate successful checkout
            reset();
            alert('Thank you for your order!');
          }}
          className="w-full rounded-md bg-gray-900 text-white px-4 py-2 text-sm font-medium hover:bg-black"
        >
          Place order
        </button>
        <p className="text-xs text-gray-600">This is a demo checkout. No payment is processed.</p>
      </div>
    </div>
  );
}
