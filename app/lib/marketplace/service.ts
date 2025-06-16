import { MarketplaceProduct, MarketplaceSearchParams, MarketplaceSearchResponse } from './types';

export class MarketplaceService {
  private apiKey: string;
  private apiSecret: string;
  private partnerTag: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.MARKETPLACE_API_KEY || '';
    this.apiSecret = process.env.MARKETPLACE_API_SECRET || '';
    this.partnerTag = process.env.MARKETPLACE_PARTNER_TAG || '';
    this.baseUrl = 'https://webservices.amazon.com/paapi5/searchitems';
  }

  async searchProducts(params: MarketplaceSearchParams): Promise<MarketplaceSearchResponse> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey,
        },
        body: JSON.stringify({
          Keywords: params.keywords,
          SearchIndex: params.category || 'All',
          ItemCount: 10,
          Resources: [
            'ItemInfo.Title',
            'ItemInfo.Features',
            'ItemInfo.ProductInfo',
            'Offers.Listings.Price',
            'Images.Primary.Large',
            'CustomerReviews',
          ],
          PartnerTag: this.partnerTag,
          PartnerType: 'Associates',
          Marketplace: 'www.amazon.com',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products from marketplace');
      }

      const data = await response.json();
      return this.transformResponse(data, params.page || 1);
    } catch (error) {
      console.error('Error searching marketplace products:', error);
      throw error;
    }
  }

  private transformResponse(data: any, page: number): MarketplaceSearchResponse {
    const products = data.SearchResult.Items.map((item: any) => ({
      asin: item.ASIN,
      title: item.ItemInfo.Title.DisplayValue,
      description: item.ItemInfo.Features?.DisplayValue?.join(' ') || '',
      price: item.Offers.Listings[0].Price.Amount,
      currency: item.Offers.Listings[0].Price.Currency,
      imageUrl: item.Images.Primary.Large.URL,
      brand: item.ItemInfo.ProductInfo.Brand?.DisplayValue || '',
      category: item.ItemInfo.ProductInfo.ProductType?.DisplayValue || '',
      rating: item.CustomerReviews?.StarRating?.DisplayValue || 0,
      reviewCount: item.CustomerReviews?.Count?.DisplayValue || 0,
      availability: item.Offers.Listings[0].Availability?.Type === 'Now',
      marketplaceId: 'amazon',
    }));

    return {
      products,
      totalResults: data.SearchResult.TotalResultCount,
      currentPage: page,
      totalPages: Math.ceil(data.SearchResult.TotalResultCount / 10),
    };
  }
} 