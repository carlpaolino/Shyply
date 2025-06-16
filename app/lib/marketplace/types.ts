export interface MarketplaceProduct {
  asin: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  brand: string;
  category: string;
  rating?: number;
  reviewCount?: number;
  availability: boolean;
  marketplaceId: string;
}

export interface MarketplaceSearchParams {
  keywords: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  sortBy?: 'price' | 'rating' | 'relevance';
}

export interface MarketplaceSearchResponse {
  products: MarketplaceProduct[];
  totalResults: number;
  currentPage: number;
  totalPages: number;
} 