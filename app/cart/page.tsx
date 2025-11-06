"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/components/CartProvider';

export default function CartPage() {
  const { items, subtotal, setQuantity, remove } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-24">
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-gray-600">Browse products and add your favorites.</p>
        <Link href="/" className="inline-flex mt-6 rounded-md bg-gray-900 text-white px-4 py-2 text-sm font-medium hover:bg-black">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="flex items-center gap-4 border rounded-lg p-3">
            <div className="relative h-24 w-20 overflow-hidden rounded">
              <Image src={product.image} alt={product.title} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <div className="font-medium">{product.title}</div>
              <div className="text-sm text-gray-600">${product.price.toFixed(2)} each</div>
              <div className="mt-2 flex items-center gap-2">
                <button onClick={() => setQuantity(product.id, Math.max(0, quantity - 1))} className="h-8 w-8 border rounded">-</button>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(product.id, Math.max(1, Number(e.target.value) || 1))}
                  className="w-14 h-8 border rounded text-center"
                />
                <button onClick={() => setQuantity(product.id, quantity + 1)} className="h-8 w-8 border rounded">+</button>
                <button onClick={() => remove(product.id)} className="ml-4 text-sm text-red-600 hover:underline">Remove</button>
              </div>
            </div>
            <div className="font-semibold">${(product.price * quantity).toFixed(2)}</div>
          </div>
        ))}
      </div>

      <aside className="border rounded-lg p-6 h-fit">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="flex items-center justify-between py-2">
          <span>Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span>Shipping</span>
          <span className="text-gray-600">Calculated at checkout</span>
        </div>
        <div className="border-t mt-4 pt-4 flex items-center justify-between">
          <span className="font-semibold">Total</span>
          <span className="text-xl font-bold">${subtotal.toFixed(2)}</span>
        </div>
        <Link href="/checkout" className="mt-6 block text-center rounded-md bg-gray-900 text-white px-4 py-2 text-sm font-medium hover:bg-black">Proceed to checkout</Link>
      </aside>
    </div>
  );
}
