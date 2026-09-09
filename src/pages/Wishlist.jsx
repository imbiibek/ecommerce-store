import { useSelector, useDispatch } from "react-redux";
import { toggleWishlist } from "../features/products/productSlice";
import { addToCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { products, wishlist } = useSelector((state) => state.products);
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-red-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h1 className="font-display font-bold text-3xl text-stone-900 mb-3">Your wishlist is empty</h1>
        <p className="text-stone-400 mb-8">Save items you love by clicking the heart icon.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-stone-700 transition-colors">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-display font-bold text-3xl text-stone-900 mb-2">Wishlist</h1>
      <p className="text-stone-400 text-sm mb-8">{wishlistProducts.length} saved item{wishlistProducts.length !== 1 ? "s" : ""}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {wishlistProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl border border-stone-100 overflow-hidden hover:border-stone-200 hover:shadow-lg transition-all group">
            <div className="relative aspect-square overflow-hidden bg-stone-50">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <button
                onClick={() => dispatch(toggleWishlist(product.id))}
                className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
              >
                <svg className="w-4 h-4 text-red-500 fill-red-500" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <h2 className="font-display font-semibold text-stone-900 text-base line-clamp-2">{product.title}</h2>
              <p className="font-display font-bold text-lg text-stone-900 mt-1">${Number(product.price).toFixed(2)}</p>
              <button
                onClick={() => dispatch(addToCart(product))}
                className="mt-3 w-full bg-stone-900 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-stone-700 active:scale-[0.98] transition-all"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;