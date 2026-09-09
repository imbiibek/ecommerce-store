import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductForm from "./ProductForm";
import { deleteProduct } from "../features/products/productSlice";

const Admin = () => {
  const dispatch = useDispatch();
  const [editData, setEditData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const products = useSelector((state) => state.products.products);

  const handleEdit = (product) => {
    setEditData(product);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditData(null);
    setShowForm(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-stone-900">Admin Panel</h1>
          <p className="text-stone-400 text-sm mt-1">{products.length} products in catalog</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-stone-900 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-stone-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Products", value: products.length, icon: "📦" },
          { label: "Total Value", value: `$${products.reduce((s, p) => s + Number(p.price), 0).toFixed(0)}`, icon: "💰" },
          { label: "Avg Price", value: products.length ? `$${(products.reduce((s, p) => s + Number(p.price), 0) / products.length).toFixed(2)}` : "$0", icon: "📊" },
          { label: "Categories", value: [...new Set(products.map((p) => p.category).filter(Boolean))].length, icon: "🏷️" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-stone-100 p-4">
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="font-display font-bold text-2xl text-stone-900">{stat.value}</div>
            <div className="text-stone-400 text-xs mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg animate-fade-up">
            <div className="flex items-center justify-between p-6 border-b border-stone-100">
              <h2 className="font-display font-bold text-xl text-stone-900">
                {editData ? "Edit Product" : "New Product"}
              </h2>
              <button onClick={() => { setShowForm(false); setEditData(null); }} className="p-2 hover:bg-stone-100 rounded-xl transition-colors">
                <svg className="w-5 h-5 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <ProductForm
                key={editData ? editData.id : "new"}
                editData={editData}
                setEditData={setEditData}
                onDone={() => setShowForm(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Products table */}
      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50">
                <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-4">Product</th>
                <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-4 py-4">Category</th>
                <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-4 py-4">Price</th>
                <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-4 py-4">Stock</th>
                <th className="text-right text-xs font-semibold text-stone-500 uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.title} className="w-12 h-12 object-cover rounded-xl flex-shrink-0" />
                      <span className="font-medium text-stone-900 text-sm line-clamp-2">{product.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full font-medium">
                      {product.category || "Uncategorized"}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-display font-bold text-stone-900">${Number(product.price).toFixed(2)}</td>
                  <td className="px-4 py-4">
                    <span className={`text-sm font-medium ${product.stock <= 10 ? "text-amber-500" : "text-emerald-500"}`}>
                      {product.stock ?? "—"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-sm bg-stone-100 text-stone-700 px-3 py-1.5 rounded-lg font-medium hover:bg-stone-200 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => dispatch(deleteProduct(product.id))}
                        className="text-sm bg-red-50 text-red-500 px-3 py-1.5 rounded-lg font-medium hover:bg-red-100 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;