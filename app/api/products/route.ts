import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        seller: {
          select: {
            name: true,
            email: true,
          },
        },
        categories: true,
      },
    })

    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, description, price, imageUrl, inventory, categories } = body

    const product = await prisma.product.create({
      data: {
        title,
        description,
        price,
        imageUrl,
        inventory,
        sellerId: session.user.id,
        categories: {
          connect: categories.map((id: string) => ({ id })),
        },
      },
      include: {
        categories: true,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    )
  }
} 