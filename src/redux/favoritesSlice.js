import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("favorites")) || [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const newBook = action.payload;
      if (!state.items.find((book) => book.id === newBook.id)) {
        state.items.push(newBook);
      }
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter((book) => book.id !== action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
    clearFavorites: (state) => {
      state.items = [];
      localStorage.removeItem("favorites");
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
