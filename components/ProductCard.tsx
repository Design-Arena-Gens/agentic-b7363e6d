import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/data/products';
import { AddToCartButton } from '@/components/buttons/AddToCartButton';

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group border rounded-lg overflow-hidden bg-white">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="aspect-[4/5] relative overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={false}
          />
        </div>
      </Link>
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-medium leading-tight">
            <Link href={`/products/${product.slug}`}>{product.title}</Link>
          </h3>
          <span className="font-semibold">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
        <AddToCartButton product={product} className="w-full" />
      </div>
    </div>
  );
}
