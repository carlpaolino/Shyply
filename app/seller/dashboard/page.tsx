import Link from "next/link"

// This would typically come from your database
const MOCK_STATS = {
  totalSales: 12500,
  totalOrders: 45,
  averageOrderValue: 277.78,
  activeListings: 12,
}

const MOCK_PRODUCTS = [
  {
    id: "1",
    title: "Classic White T-Shirt",
    price: 1999,
    inventory: 50,
    sales: 15,
  },
  {
    id: "2",
    title: "Slim Fit Jeans",
    price: 5999,
    inventory: 25,
    sales: 8,
  },
]

export default function SellerDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Seller Dashboard</h1>
        <Link
          href="/seller/products/new"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
        >
          Add New Product
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card rounded-lg p-6 shadow">
          <h3 className="text-sm font-medium text-muted-foreground">
            Total Sales
          </h3>
          <p className="text-2xl font-bold">
            ${(MOCK_STATS.totalSales / 100).toFixed(2)}
          </p>
        </div>
        <div className="bg-card rounded-lg p-6 shadow">
          <h3 className="text-sm font-medium text-muted-foreground">
            Total Orders
          </h3>
          <p className="text-2xl font-bold">{MOCK_STATS.totalOrders}</p>
        </div>
        <div className="bg-card rounded-lg p-6 shadow">
          <h3 className="text-sm font-medium text-muted-foreground">
            Average Order Value
          </h3>
          <p className="text-2xl font-bold">
            ${MOCK_STATS.averageOrderValue.toFixed(2)}
          </p>
        </div>
        <div className="bg-card rounded-lg p-6 shadow">
          <h3 className="text-sm font-medium text-muted-foreground">
            Active Listings
          </h3>
          <p className="text-2xl font-bold">{MOCK_STATS.activeListings}</p>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-card rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Your Products</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                  Inventory
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                  Sales
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {MOCK_PRODUCTS.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="px-6 py-4">
                    <div className="font-medium">{product.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    ${(product.price / 100).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">{product.inventory}</td>
                  <td className="px-6 py-4">{product.sales}</td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/seller/products/${product.id}/edit`}
                      className="text-primary hover:text-primary/90"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 