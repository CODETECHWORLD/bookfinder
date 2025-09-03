// src/redux/searchesSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Safe function to load from localStorage
const getInitialSearches = () => {
  try {
    const data = localStorage.getItem("recentSearches");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.warn("Invalid localStorage recentSearches, resetting...");
    localStorage.removeItem("recentSearches");
    return [];
  }
};

const searchesSlice = createSlice({
  name: "searches",
  initialState: {
    recentSearches: getInitialSearches(),
  },
  reducers: {
    addSearch: (state, action) => {
      const query = action.payload.trim();
      if (!query) return;

      // Avoid duplicates, keep max 10
      state.recentSearches = [
        query,
        ...state.recentSearches.filter((q) => q !== query),
      ].slice(0, 10);

      localStorage.setItem(
        "recentSearches",
        JSON.stringify(state.recentSearches)
      );
    },
    clearSearches: (state) => {
      state.recentSearches = [];
      localStorage.removeItem("recentSearches");
    },
  },
});

export const { addSearch, clearSearches } = searchesSlice.actions;
export default searchesSlice.reducer;
