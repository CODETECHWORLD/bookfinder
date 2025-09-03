// src/App.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SearchBar from "./Components/SearchBar";
import BookList from "./Components/BookList";
import RecentSearches from "./Components/RecentSearches";
import FavoritesList from "./Components/FavoritesList";
import GenreFilter from "./Components/GenreFilter";

import { fetchBooksThunk, setSearchTerm } from "./redux/booksSlice";
import { addSearch } from "./redux/searchesSlice";
import { addFavorite } from "./redux/favoritesSlice";

export default function App() {
  const dispatch = useDispatch();
  const { books, loading, searchTerm, genre } = useSelector(
    (state) => state.books
  );
  const favorites = useSelector((state) => state.favorites.items);

  // Fetch books whenever searchTerm or genre changes
  useEffect(() => {
    if (searchTerm) {
      dispatch(fetchBooksThunk({ searchTerm, genre }));
    }
  }, [searchTerm, genre, dispatch]);

  // Handle search from SearchBar
  const handleSearch = (query) => {
    if (!query) return;
    dispatch(setSearchTerm(query));
    dispatch(addSearch(query)); // persist recent searches
  };

  // Add book to favorites
  const handleAddFavorite = (book) => {
    if (!favorites.some((fav) => fav.id === book.id)) {
      dispatch(addFavorite(book));
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-center text-blue-700">
        📚 Book Finder
      </h1>

      {/* Search Input */}
      <SearchBar onSearch={handleSearch} />

      {/* Recent Searches */}
      <RecentSearches onSearch={handleSearch} />

      {/* Genre Filter */}
      <GenreFilter />

      {/* Book List */}
      <div className="mt-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Search Results
        </h2>
        <BookList
          books={books}
          loading={loading}
          searchTerm={searchTerm}
          onFavorite={handleAddFavorite}
        />
      </div>

      {/* Favorites */}
      <FavoritesList />
    </div>
  );
}
