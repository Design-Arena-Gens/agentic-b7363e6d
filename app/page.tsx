import { ProductGrid } from '@/components/ProductGrid';
import { products } from '@/data/products';

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-xl bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Elevate Your Everyday Style</h1>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Discover curated essentials and trend-forward pieces designed for comfort and confidence.
          </p>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Featured Products</h2>
        </div>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
