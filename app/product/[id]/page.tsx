import Image from "next/image"

// This would typically come from your database
const MOCK_PRODUCT = {
  id: "1",
  title: "Classic White T-Shirt",
  description: "A comfortable, everyday essential made from 100% organic cotton. Perfect for any casual occasion.",
  price: 1999, // $19.99
  imageUrl: "/images/products/tshirt.jpg",
  sizes: ["S", "M", "L", "XL"],
  colors: ["White", "Black", "Navy"],
}

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  // In a real app, you would fetch the product data based on the ID
  const product = MOCK_PRODUCT

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-square relative">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-2xl font-semibold">
            ${(product.price / 100).toFixed(2)}
          </p>
          <p className="text-gray-600">{product.description}</p>

          {/* Size Selection */}
          <div>
            <h2 className="text-sm font-medium text-gray-900">Size</h2>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className="border rounded-md py-2 px-3 text-sm font-medium hover:bg-gray-50"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <h2 className="text-sm font-medium text-gray-900">Color</h2>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className="border rounded-md py-2 px-3 text-sm font-medium hover:bg-gray-50"
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-md hover:bg-primary/90">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
} 