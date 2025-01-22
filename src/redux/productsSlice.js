import { createSlice } from '@reduxjs/toolkit';
import productsData from '../data/products.json';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: productsData,
    filteredItems: productsData,
    filters: {
      brand: null,
      internalStorage: null,
      camera: null,
      color: null,
      batteryLife:null,
      priceRange: [0, 2000],
      rating: null,
    },
  },
  reducers: {
    selectProduct: (state, action) => {
      state.selectedProduct = state.items.find(product => product.id === action.payload);
    },
    setFilters: (state, action) => {
      // Update filters with new values
      state.filters = { ...state.filters, ...action.payload };

      // Apply filtering logic
      state.filteredItems = state.items.filter(product => {
        const {
          brand,
          internalStorage,
          camera,
          color,
          priceRange,
          batteryLife,
          rating,
        } = state.filters;

        return (
          (!brand || brand.length === 0 || brand.includes(product.brand)) &&
          (!batteryLife || batteryLife.length === 0 || batteryLife.includes(product.batteryLife)) &&
          (!internalStorage || product.internalStorage === internalStorage) &&
          // (!batteryLife || product.batteryLife === batteryLife) &&
          (!camera || camera.length === 0 || camera.includes(product.camera)) &&

          (!color || product.colors.includes(color)) &&
          product.price >= priceRange[0] &&
          product.price <= priceRange[1] &&
          (!rating || product.rating >= rating)
        );
      });

      // Ensure the filteredItems array is never empty unless it should be
      if (state.filteredItems.length === 0) {
        state.filteredItems = state.items; // Reset to all items if no match
      }
    },
    clearFilters: state => {
      // Reset filters and restore all items
      state.filters = {
        brand: null,
        internalStorage: null,
        batteryLife:null,
        camera: null,
        color: null,
        priceRange: [0, 2000],
        rating: null,
      };
      state.filteredItems = state.items;
    },
  },
});

export const { selectProduct, setFilters, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;
