import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.items.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;  // Increment quantity if product already in cart
      } else {
        state.items.push({ ...product, quantity: 1 });  // Add product with initial quantity 1
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload); // Remove product
    },
    updateQuantity: (state, action) => {
      const { productId, quantityChange } = action.payload;
      const product = state.items.find(item => item.id === productId);
      if (product) {
        product.quantity += quantityChange; // Update quantity based on action
        // If quantity becomes 0 or less, remove the item from the cart
        if (product.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== productId);
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
