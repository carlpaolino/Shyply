import { NextRequest, NextResponse } from 'next/server';
import { MarketplaceService } from '@/app/lib/marketplace/service';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const keywords = searchParams.get('keywords') || '';
    const category = searchParams.get('category') || undefined;
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    const sortBy = searchParams.get('sortBy') as 'price' | 'rating' | 'relevance' | undefined;

    const marketplaceService = new MarketplaceService();
    const results = await marketplaceService.searchProducts({
      keywords,
      category,
      minPrice,
      maxPrice,
      page,
      sortBy,
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error in marketplace search:', error);
    return NextResponse.json(
      { error: 'Failed to search marketplace products' },
      { status: 500 }
    );
  }
} 