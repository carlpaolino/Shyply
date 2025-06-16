import { MarketplaceProduct, MarketplaceSearchParams, MarketplaceSearchResponse } from './types';

export class MarketplaceService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'https://fakestoreapi.com/products';
  }

  async searchProducts(params: MarketplaceSearchParams): Promise<MarketplaceSearchResponse> {
    // Fake Store API does not support search, so we fetch all and filter client-side
    const response = await fetch(this.baseUrl);
    if (!response.ok) throw new Error('Failed to fetch products from Fake Store API');
    const data = await response.json();

    // Filter by keywords (title/description)
    let products = data.filter((item: any) => {
      if (!params.keywords) return true;
      const keyword = params.keywords.toLowerCase();
      return (
        item.title.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword)
      );
    });

    // Filter by category
    if (params.category) {
      products = products.filter((item: any) => item.category === params.category);
    }

    // Filter by price
    if (typeof params.minPrice === 'number') {
      products = products.filter((item: any) => item.price >= params.minPrice!);
    }
    if (typeof params.maxPrice === 'number') {
      products = products.filter((item: any) => item.price <= params.maxPrice!);
    }

    // Pagination
    const page = params.page || 1;
    const pageSize = 10;
    const totalResults = products.length;
    const totalPages = Math.ceil(totalResults / pageSize);
    const paginated = products.slice((page - 1) * pageSize, page * pageSize);

    // Map to MarketplaceProduct type
    const mapped: MarketplaceProduct[] = paginated.map((item: any) => ({
      asin: String(item.id),
      title: item.title,
      description: item.description,
      price: item.price,
      currency: 'USD',
      imageUrl: item.image,
      brand: item.category, // Fake Store API does not have brand, use category
      category: item.category,
      rating: item.rating?.rate || 0,
      reviewCount: item.rating?.count || 0,
      availability: true,
      marketplaceId: 'fakestore',
    }));

    return {
      products: mapped,
      totalResults,
      currentPage: page,
      totalPages,
    };
  }
} 