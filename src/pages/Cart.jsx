import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { removeFromCart, increaseQty, decreaseQty, clearCart } from "../features/cart/cartSlice"

const Cart = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500 mb-4">Your cart is empty.</p>
        <Link to="/" className="text-blue-600 underline">
          Continue shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border rounded-md p-3"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-cover rounded-md"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => dispatch(decreaseQty(item.id))}
                  className="border px-2 rounded-md"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => dispatch(increaseQty(item.id))}
                  className="border px-2 rounded-md"
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500 text-sm mt-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6 border-t pt-4">
        <button
          onClick={() => dispatch(clearCart())}
          className="text-sm text-gray-500 underline"
        >
          Clear Cart
        </button>
        <div className="text-right">
          <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
          <button className="mt-2 bg-black text-white px-6 py-2 rounded-md">
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart