import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { toggleWishlist } from "../features/products/productSlice";

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${star <= Math.floor(rating) ? "text-amber-400" : star - 0.5 <= rating ? "text-amber-300" : "text-stone-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-stone-400 ml-1">{rating}</span>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.products.wishlist);
  const cartItems = useSelector((state) => state.cart.items);
  const isWishlisted = wishlist.includes(product.id);
  const inCart = cartItems.some((item) => item.id === product.id);
  const outOfStock = product.stock === 0;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-stone-100 hover:border-stone-200 hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image area */}
      <div className="relative overflow-hidden bg-stone-50 aspect-square">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-stone-700 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
          {product.category}
        </span>
        {/* Stock badge */}
        {product.stock <= 10 && product.stock > 0 && (
          <span className="absolute top-3 right-12 bg-amber-400 text-stone-900 text-xs font-bold px-2 py-1 rounded-full">
            Only {product.stock} left
          </span>
        )}
        {/* Wishlist button */}
        <button
          onClick={() => dispatch(toggleWishlist(product.id))}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <svg
            className={`w-4 h-4 ${isWishlisted ? "text-red-500 fill-red-500" : "text-stone-400"}`}
            fill={isWishlisted ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <StarRating rating={product.rating || 4.0} />
        <h2 className="font-display font-semibold text-stone-900 mt-2 text-base leading-snug line-clamp-2">
          {product.title}
        </h2>
        {product.description && (
          <p className="text-stone-400 text-xs mt-1.5 line-clamp-2 leading-relaxed flex-1">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-4">
          <span className="font-display font-bold text-xl text-stone-900">
            ${Number(product.price).toFixed(2)}
          </span>
          <button
            onClick={() => dispatch(addToCart(product))}
            disabled={outOfStock}
            className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-xl transition-all ${
              outOfStock
                ? "bg-stone-100 text-stone-400 cursor-not-allowed"
                : inCart
                ? "bg-stone-100 text-stone-500 hover:bg-stone-200"
                : "bg-stone-900 text-white hover:bg-stone-700 active:scale-95"
            }`}
          >
            {!outOfStock && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            )}
            {outOfStock ? "Out of Stock" : inCart ? "In Cart" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;