import { ProductGrid } from "@/components/product-grid"

// This would typically come from your database
const MOCK_PRODUCTS = [
  {
    id: "1",
    title: "Classic White T-Shirt",
    description: "A comfortable, everyday essential",
    price: 1999, // $19.99
    imageUrl: "/images/products/tshirt.jpg",
  },
  {
    id: "2",
    title: "Slim Fit Jeans",
    description: "Modern fit with premium denim",
    price: 5999, // $59.99
    imageUrl: "/images/products/jeans.jpg",
  },
  // Add more mock products as needed
]

export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shop</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters would go here */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          {/* Filter components would go here */}
        </div>
        {/* Products grid */}
        <div className="md:col-span-3">
          <ProductGrid products={MOCK_PRODUCTS} />
        </div>
      </div>
    </div>
  )
} 