"use client";

import Link from 'next/link';
import { useCart } from '@/components/CartProvider';

export function Navbar() {
  const { count } = useCart();

  return (
    <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">Clothify</Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <Link href="/cart" className="relative hover:text-gray-700">
            Cart
            <span className="ml-2 inline-flex items-center justify-center text-xs font-medium rounded-full bg-gray-900 text-white h-5 min-w-[1.25rem] px-1">
              {count}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
