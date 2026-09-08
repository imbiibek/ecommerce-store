import { useSelector, useDispatch } from "react-redux"
import { setSearchQuery, setCategory, setSortBy } from "../features/products/productSlice"
import ProductCard from "../components/ProductCard"

const Home = () => {
  const dispatch = useDispatch()
  const { products, searchQuery, selectedCategory, sortBy } = useSelector(
    (state) => state.products
  )

  const categories = ["All", ...new Set(products.map((p) => p.category))]

  let filtered = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (sortBy === "priceLowHigh") {
    filtered = [...filtered].sort((a, b) => a.price - b.price)
  } else if (sortBy === "priceHighLow") {
    filtered = [...filtered].sort((a, b) => b.price - a.price)
  } else if (sortBy === "rating") {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating)
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="border rounded-md px-3 py-2 flex-1"
        />
        <select
          value={selectedCategory}
          onChange={(e) => dispatch(setCategory(e.target.value))}
          className="border rounded-md px-3 py-2"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          className="border rounded-md px-3 py-2"
        >
          <option value="default">Default</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">No products match your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home