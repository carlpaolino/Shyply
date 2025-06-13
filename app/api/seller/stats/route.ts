import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

type OrderItem = {
  quantity: number
  price: number
}

type Review = {
  rating: number
}

type Product = {
  orderItems: OrderItem[]
  reviews: Review[]
  _count: {
    reviews: number
  }
}

export async function GET() {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const seller = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        products: {
          include: {
            _count: {
              select: {
                reviews: true,
                orderItems: true,
              },
            },
            reviews: {
              select: {
                rating: true,
              },
            },
            orderItems: true,
          },
        },
      },
    })

    if (!seller) {
      return NextResponse.json(
        { error: "Seller not found" },
        { status: 404 }
      )
    }

    // Calculate total products
    const totalProducts = seller.products.length

    // Calculate total sales
    const totalSales = seller.products.reduce(
      (sum: number, product: Product) =>
        sum +
        product.orderItems.reduce(
          (itemSum: number, item: OrderItem) =>
            itemSum + item.quantity,
          0
        ),
      0
    )

    // Calculate total revenue
    const totalRevenue = seller.products.reduce(
      (sum: number, product: Product) =>
        sum +
        product.orderItems.reduce(
          (itemSum: number, item: OrderItem) =>
            itemSum + item.price * item.quantity,
          0
        ),
      0
    )

    // Calculate average rating
    const totalRatings = seller.products.reduce(
      (sum: number, product: Product) =>
        sum +
        product.reviews.reduce(
          (ratingSum: number, review: Review) =>
            ratingSum + review.rating,
          0
        ),
      0
    )
    const totalReviews = seller.products.reduce(
      (sum: number, product: Product) => sum + product._count.reviews,
      0
    )
    const averageRating = totalReviews
      ? parseFloat((totalRatings / totalReviews).toFixed(1))
      : 0

    return NextResponse.json({
      totalProducts,
      totalSales,
      totalRevenue,
      totalReviews,
      averageRating,
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch seller statistics" },
      { status: 500 }
    )
  }
} 