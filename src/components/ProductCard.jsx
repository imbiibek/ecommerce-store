import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../features/cart/cartSlice"
import { toggleWishlist } from "../features/products/productSlice"

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const wishlist = useSelector((state) => state.products.wishlist)
  const isWishlisted = wishlist.includes(product.id)

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover rounded-md mb-3"
      />
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">{product.title}</h3>
        <button onClick={() => dispatch(toggleWishlist(product.id))}>
          {isWishlisted ? "❤️" : "🤍"}
        </button>
      </div>
      <p className="text-sm text-gray-500">{product.category}</p>
      <p className="text-yellow-600 text-sm">⭐ {product.rating}</p>
      <p className="font-bold text-lg mt-1">${product.price.toFixed(2)}</p>
      <p className="text-sm text-gray-600 line-clamp-2 mt-1">{product.description}</p>
      <button
        onClick={() => dispatch(addToCart(product))}
        disabled={product.stock === 0}
        className="mt-3 w-full bg-black text-white py-2 rounded-md disabled:bg-gray-300"
      >
        {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
      </button>
    </div>
  )
}

export default ProductCard