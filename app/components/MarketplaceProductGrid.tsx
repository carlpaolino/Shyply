import { useState, useEffect } from 'react';
import { MarketplaceProduct } from '../lib/marketplace/types';
import Image from 'next/image';

interface MarketplaceProductGridProps {
  initialProducts?: MarketplaceProduct[];
  searchParams?: {
    keywords?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
  };
}

export default function MarketplaceProductGrid({
  initialProducts = [],
  searchParams = {},
}: MarketplaceProductGridProps) {
  const [products, setProducts] = useState<MarketplaceProduct[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!searchParams.keywords) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const queryParams = new URLSearchParams({
          keywords: searchParams.keywords,
          ...(searchParams.category && { category: searchParams.category }),
          ...(searchParams.minPrice && { minPrice: searchParams.minPrice.toString() }),
          ...(searchParams.maxPrice && { maxPrice: searchParams.maxPrice.toString() }),
        });

        const response = await fetch(`/api/marketplace/search?${queryParams}`);
        if (!response.ok) throw new Error('Failed to fetch products');
        
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center text-gray-500 p-4">
        No products found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <div
          key={product.asin}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative h-48 w-full">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-contain"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.title}</h3>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: product.currency,
                }).format(product.price)}
              </span>
              {product.rating && (
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-sm">{product.rating.toFixed(1)}</span>
                </div>
              )}
            </div>
            <button
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
              onClick={() => {
                // Add to cart functionality
                console.log('Add to cart:', product);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 