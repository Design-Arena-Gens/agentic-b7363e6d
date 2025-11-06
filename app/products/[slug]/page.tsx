import Image from 'next/image';
import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import { AddToCartButton } from '@/components/buttons/AddToCartButton';

export default function ProductDetail({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return notFound();

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="relative aspect-[4/5] rounded-lg overflow-hidden border">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">{product.title}</h1>
          <p className="mt-2 text-gray-600">{product.description}</p>
        </div>
        <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>
        <AddToCartButton product={product} />
        <div className="pt-6 border-t">
          <h3 className="font-medium mb-2">Details</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>Category: {product.category}</li>
            <li>Free returns within 30 days</li>
            <li>Free shipping on orders over $50</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
