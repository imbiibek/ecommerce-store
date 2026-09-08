import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"

const Wishlist = () => {
  const { products, wishlist } = useSelector((state) => state.products)

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id))

  if (wishlistedProducts.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500 mb-4">Your wishlist is empty.</p>
        <Link to="/" className="text-blue-600 underline">
          Browse products
        </Link>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Wishlist