import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items)
  const wishlist = useSelector((state) => state.products.wishlist)

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b shadow-sm">
      <Link to="/" className="text-xl font-bold">
        MyShop
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/" className="hover:text-gray-600">
          Home
        </Link>
        <Link to="/wishlist" className="relative hover:text-gray-600">
          Wishlist
          {wishlist.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-1.5">
              {wishlist.length}
            </span>
          )}
        </Link>
        <Link to="/cart" className="relative hover:text-gray-600">
          Cart
          {totalCartItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-black text-white text-xs rounded-full px-1.5">
              {totalCartItems}
            </span>
          )}
        </Link>
        <Link to="/admin" className="hover:text-gray-600">
          Admin
        </Link>
      </div>
    </nav>
  )
}

export default Navbar