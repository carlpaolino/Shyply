import Image from "next/image"
import Link from "next/link"

// This would typically come from your cart state/database
const MOCK_CART_ITEMS = [
  {
    id: "1",
    title: "Classic White T-Shirt",
    price: 1999,
    quantity: 2,
    imageUrl: "/images/products/tshirt.jpg",
  },
  {
    id: "2",
    title: "Slim Fit Jeans",
    price: 5999,
    quantity: 1,
    imageUrl: "/images/products/jeans.jpg",
  },
]

export default function CartPage() {
  const subtotal = MOCK_CART_ITEMS.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
  const shipping = 599 // $5.99
  const total = subtotal + shipping

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {MOCK_CART_ITEMS.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {MOCK_CART_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <div className="relative h-24 w-24">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-500">
                      ${(item.price / 100).toFixed(2)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button className="border rounded-md px-2 py-1">
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button className="border rounded-md px-2 py-1">
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ${((item.price * item.quantity) / 100).toFixed(2)}
                    </p>
                    <button className="text-sm text-red-600 hover:text-red-500">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${(subtotal / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${(shipping / 100).toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${(total / 100).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 bg-primary text-primary-foreground py-3 px-4 rounded-md hover:bg-primary/90">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 