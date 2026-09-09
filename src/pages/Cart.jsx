import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const shipping = total > 100 ? 0 : 9.99;
  const tax = total * 0.08;
  const grandTotal = total + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 bg-stone-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 7H4l1-7z" />
          </svg>
        </div>
        <h1 className="font-display font-bold text-3xl text-stone-900 mb-3">Your cart is empty</h1>
        <p className="text-stone-400 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-stone-700 transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-stone-900">Shopping Cart</h1>
          <p className="text-stone-400 text-sm mt-1">{totalItems} item{totalItems !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={() => dispatch(clearCart())}
          className="text-sm text-red-400 hover:text-red-600 font-medium transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-stone-100 p-4 flex gap-4 hover:border-stone-200 transition-colors"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <h2 className="font-display font-semibold text-stone-900 text-base leading-snug">
                    {item.title}
                  </h2>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="p-1 text-stone-300 hover:text-red-500 transition-colors flex-shrink-0"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {item.category && (
                  <span className="inline-block text-xs text-stone-400 bg-stone-50 px-2 py-0.5 rounded-full mt-1">
                    {item.category}
                  </span>
                )}

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-1 bg-stone-50 rounded-xl p-1">
                    <button
                      onClick={() => dispatch(decreaseQty(item.id))}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-colors text-stone-700 font-bold"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-bold text-stone-900">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(increaseQty(item.id))}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-colors text-stone-700 font-bold"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-display font-bold text-xl text-stone-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-stone-100 p-6 sticky top-24">
            <h2 className="font-display font-bold text-xl text-stone-900 mb-6">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal ({totalItems} items)</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-emerald-500 font-medium" : ""}>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between text-stone-600">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              {shipping > 0 && (
                <p className="text-xs text-stone-400 bg-stone-50 px-3 py-2 rounded-lg">
                  Add ${(100 - total).toFixed(2)} more for free shipping!
                </p>
              )}

              <div className="border-t border-stone-100 pt-3 flex justify-between font-display font-bold text-lg text-stone-900">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Promo code"
                className="flex-1 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300"
              />
              <button className="bg-stone-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-stone-700 transition-colors">
                Apply
              </button>
            </div>

            <button className="mt-4 w-full bg-stone-900 text-white py-4 rounded-xl font-semibold text-base hover:bg-stone-700 transition-colors active:scale-[0.98]">
              Proceed to Checkout
            </button>

            <Link to="/" className="block text-center text-stone-400 text-sm mt-3 hover:text-stone-600 transition-colors">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;