// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Header from "./Components/Header";
import SearchBar from "./Components/SearchBar";
import BookList from "./Components/BookList";
import RecentSearches from "./Components/RecentSearches";
import FavoritesList from "./Components/FavoritesList";
import GenreFilter from "./Components/GenreFilter";

import { fetchBooksThunk, setSearchTerm } from "./redux/booksSlice";
import { addSearch } from "./redux/searchesSlice";
import { addFavorite } from "./redux/favoritesSlice";

function MainPage() {
  const dispatch = useDispatch();
  const { books, loading, searchTerm, genre } = useSelector(
    (state) => state.books
  );
  const favorites = useSelector((state) => state.favorites.items);

  useEffect(() => {
    if (searchTerm) {
      dispatch(fetchBooksThunk({ searchTerm, genre }));
    }
  }, [searchTerm, genre, dispatch]);

  const handleSearch = (query) => {
    if (!query) return;
    dispatch(setSearchTerm(query));
    dispatch(addSearch(query));
  };

  const handleAddFavorite = (book) => {
    if (!favorites.some((fav) => fav.id === book.id)) {
      dispatch(addFavorite(book));
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <SearchBar onSearch={handleSearch} />
      <RecentSearches onSearch={handleSearch} />
      <GenreFilter />
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
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/favorites" element={<FavoritesList />} />
        <Route path="/genres" element={<GenreFilter />} />
      </Routes>
    </Router>
  );
}
