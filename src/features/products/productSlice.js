import { createSlice } from "@reduxjs/toolkit";

const defaultProducts = [
  {
    id: 1,
    title: "Wireless Headphones Pro",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    category: "Electronics",
    description: "Premium sound quality with active noise cancellation and 30-hour battery life.",
    rating: 4.5,
    stock: 15,
  },
  {
    id: 2,
    title: "Minimalist Watch",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    category: "Accessories",
    description: "Elegant stainless steel watch with sapphire crystal glass and Swiss movement.",
    rating: 4.8,
    stock: 8,
  },
  {
    id: 3,
    title: "Running Sneakers",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
    category: "Footwear",
    description: "Lightweight and breathable sneakers with advanced cushioning technology.",
    rating: 4.3,
    stock: 22,
  },
  {
    id: 4,
    title: "Leather Backpack",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    category: "Bags",
    description: "Handcrafted genuine leather backpack with laptop compartment and USB charging port.",
    rating: 4.6,
    stock: 12,
  },
  {
    id: 5,
    title: "Polarized Sunglasses",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
    category: "Accessories",
    description: "UV400 protection with polarized lenses. Lightweight titanium frame.",
    rating: 4.2,
    stock: 30,
  },
  {
    id: 6,
    title: "Smart Water Bottle",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop",
    category: "Lifestyle",
    description: "Temperature-tracking smart bottle with LED display and hydration reminders.",
    rating: 4.4,
    stock: 18,
  },
];

const storedProducts =
  JSON.parse(localStorage.getItem("products")) || defaultProducts;

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: storedProducts,
    searchQuery: "",
    selectedCategory: "All",
    sortBy: "default",
    wishlist: JSON.parse(localStorage.getItem("wishlist")) || [],
  },
  reducers: {
    addProduct: (state, action) => {
      const newProduct = { ...action.payload, id: Date.now() };
      state.products.push(newProduct);
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((item) => item.id !== action.payload);
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex((item) => item.id === action.payload.id);
      state.products[index] = action.payload;
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    toggleWishlist: (state, action) => {
      const id = action.payload;
      if (state.wishlist.includes(id)) {
        state.wishlist = state.wishlist.filter((wid) => wid !== id);
      } else {
        state.wishlist.push(id);
      }
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  updateProduct,
  setSearchQuery,
  setCategory,
  setSortBy,
  toggleWishlist,
} = productSlice.actions;
export default productSlice.reducer;