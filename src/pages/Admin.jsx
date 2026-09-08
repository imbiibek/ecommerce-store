import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addProduct, updateProduct, deleteProduct } from "../features/products/productSlice"

const emptyForm = {
  title: "",
  price: "",
  image: "",
  category: "",
  description: "",
  rating: "",
  stock: "",
}

const Admin = () => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.products)

  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const productData = {
      ...form,
      price: parseFloat(form.price),
      rating: parseFloat(form.rating),
      stock: parseInt(form.stock),
    }

    if (editingId) {
      dispatch(updateProduct({ ...productData, id: editingId }))
      setEditingId(null)
    } else {
      dispatch(addProduct(productData))
    }

    setForm(emptyForm)
  }

  const handleEdit = (product) => {
    setForm({
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      description: product.description,
      rating: product.rating,
      stock: product.stock,
    })
    setEditingId(product.id)
  }

  const handleCancelEdit = () => {
    setForm(emptyForm)
    setEditingId(null)
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 border p-4 rounded-md">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="border rounded-md px-3 py-2"
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          step="0.01"
          required
          className="border rounded-md px-3 py-2"
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          required
          className="border rounded-md px-3 py-2"
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          required
          className="border rounded-md px-3 py-2"
        />
        <input
          name="rating"
          value={form.rating}
          onChange={handleChange}
          placeholder="Rating"
          type="number"
          step="0.1"
          max="5"
          className="border rounded-md px-3 py-2"
        />
        <input
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          type="number"
          className="border rounded-md px-3 py-2"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border rounded-md px-3 py-2 sm:col-span-2"
        />

        <div className="sm:col-span-2 flex gap-2">
          <button type="submit" className="bg-black text-white px-6 py-2 rounded-md">
            {editingId ? "Update Product" : "Add Product"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="border px-6 py-2 rounded-md"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="flex flex-col gap-2">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between border rounded-md p-3"
          >
            <div className="flex items-center gap-3">
              <img src={product.image} alt={product.title} className="w-12 h-12 object-cover rounded-md" />
              <div>
                <p className="font-semibold">{product.title}</p>
                <p className="text-sm text-gray-500">${product.price} · {product.category}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(product)} className="text-blue-600 text-sm">
                Edit
              </button>
              <button onClick={() => dispatch(deleteProduct(product.id))} className="text-red-500 text-sm">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Admin