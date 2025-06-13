import Image from "next/image"
import Link from "next/link"

interface ProductCardProps {
  id: string
  title: string
  description: string
  price: number
  imageUrl: string
}

export function ProductCard({
  id,
  title,
  description,
  price,
  imageUrl,
}: ProductCardProps) {
  return (
    <Link href={`/product/${id}`}>
      <div className="group relative">
        <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={imageUrl}
            alt={title}
            width={500}
            height={500}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <span aria-hidden="true" className="absolute inset-0" />
              {title}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">
            ${(price / 100).toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  )
} 