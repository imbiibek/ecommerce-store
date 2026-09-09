import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "../features/products/productSlice";

const emptyForm = {
  title: "",
  price: "",
  image: "",
  category: "",
  description: "",
  rating: "",
  stock: "",
};

const ProductForm = ({ editData, setEditData, onDone }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState(
    editData
      ? {
          title: editData.title,
          price: editData.price,
          image: editData.image,
          category: editData.category,
          description: editData.description,
          rating: editData.rating,
          stock: editData.stock,
        }
      : emptyForm
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      ...form,
      price: parseFloat(form.price),
      rating: parseFloat(form.rating),
      stock: parseInt(form.stock),
    };

    if (editData) {
      dispatch(updateProduct({ ...productData, id: editData.id }));
      setEditData(null);
    } else {
      dispatch(addProduct(productData));
    }

    onDone();
  };

  const inputClass =
    "border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-300";

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
        className={inputClass}
      />
      <input
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        type="number"
        step="0.01"
        required
        className={inputClass}
      />
      <input
        name="image"
        value={form.image}
        onChange={handleChange}
        placeholder="Image URL"
        required
        className={`${inputClass} sm:col-span-2`}
      />
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        required
        className={inputClass}
      />
      <input
        name="rating"
        value={form.rating}
        onChange={handleChange}
        placeholder="Rating"
        type="number"
        step="0.1"
        max="5"
        className={inputClass}
      />
      <input
        name="stock"
        value={form.stock}
        onChange={handleChange}
        placeholder="Stock"
        type="number"
        className={`${inputClass} sm:col-span-2`}
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        rows={3}
        className={`${inputClass} sm:col-span-2 resize-none`}
      />

      <div className="sm:col-span-2 flex gap-2 pt-2">
        <button
          type="submit"
          className="flex-1 bg-stone-900 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-stone-700 transition-colors"
        >
          {editData ? "Update Product" : "Add Product"}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="px-6 py-2.5 rounded-xl border border-stone-200 font-semibold text-stone-600 hover:bg-stone-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;