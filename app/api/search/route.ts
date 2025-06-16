import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")
    const category = searchParams.get("category")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const sort = searchParams.get("sort") || "createdAt"
    const order = searchParams.get("order") || "desc"
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "12")

    const andFilters = []

    if (query) {
      andFilters.push({
        OR: [
          { title: { contains: query, mode: "insensitive" as const } },
          { description: { contains: query, mode: "insensitive" as const } },
        ],
      })
    }
    if (category) {
      andFilters.push({ categories: { some: { name: category } } })
    }
    if (minPrice) {
      andFilters.push({ price: { gte: parseInt(minPrice) } })
    }
    if (maxPrice) {
      andFilters.push({ price: { lte: parseInt(maxPrice) } })
    }

    const where = andFilters.length > 0 ? { AND: andFilters } : {}

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          seller: {
            select: {
              name: true,
              email: true,
            },
          },
          categories: true,
        },
        orderBy: {
          [sort]: order,
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ])

    return NextResponse.json({
      products,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to search products" },
      { status: 500 }
    )
  }
} 