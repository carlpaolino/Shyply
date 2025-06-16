import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

type Review = {
  rating: number
}

type OrderItem = {
  quantity: number
  price: number
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const product = await prisma.product.findUnique({
      where: {
        id: params.id,
      },
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
    })

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    // Calculate average rating
    const averageRating =
      product.reviews.reduce(
        (sum: number, review: Review) => sum + review.rating,
        0
      ) / (product.reviews.length || 1)

    // Calculate total sales
    const totalSales = product.orderItems.reduce(
      (sum: number, item: OrderItem) => sum + item.quantity,
      0
    )

    // Calculate revenue
    const revenue = product.orderItems.reduce(
      (sum: number, item: OrderItem) =>
        sum + item.price * item.quantity,
      0
    )

    return NextResponse.json({
      totalReviews: product._count.reviews,
      totalSales,
      revenue,
      averageRating: parseFloat(averageRating.toFixed(1)),
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product statistics" },
      { status: 500 }
    )
  }
} 