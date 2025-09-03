import { configureStore } from "@reduxjs/toolkit";
import searchesReducer from "./searchesSlice";
import favoritesReducer from "./favoritesSlice";
import booksReducer from "./booksSlice"

export const store = configureStore({
  reducer: {
    searches: searchesReducer,
    favorites: favoritesReducer,
     books: booksReducer,
  },
});

export default store;
