import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBooks as fetchBooksApi } from "../api/openLibraryApi";

// Fetch books from API
export const fetchBooksThunk = createAsyncThunk(
  "books/fetchBooks",
  async ({ searchTerm, genre, page }, { rejectWithValue }) => {
    try {
      const response = await fetchBooksApi({ searchTerm, genre, page });
      return response.docs;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    searchTerm: "",
    genre: "All",
    loading: false,
    page: 1, // API fetch page
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.books = []; // reset on new search
      state.page = 1;   // reset API fetch page
    },
    setGenre: (state, action) => {
      state.genre = action.payload;
      state.books = [];
      state.page = 1;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
    resetBooks: (state) => {
      state.books = [];
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooksThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooksThunk.fulfilled, (state, action) => {
        state.loading = false;

        // Avoid duplicates when appending new data
        const newBooks = action.payload.filter(
          (book) => !state.books.some((b) => b.id === book.id)
        );
        state.books = [...state.books, ...newBooks];
      })
      .addCase(fetchBooksThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSearchTerm, setGenre, incrementPage, resetBooks } = booksSlice.actions;
export default booksSlice.reducer;
