// src/Components/BookList.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowUp } from "react-icons/fa";
import BookCard from "./BookCard";
import { fetchBooksThunk, incrementPage } from "../redux/booksSlice";

export default function BookList({ onFavorite }) {
  const dispatch = useDispatch();
  const { books, searchTerm, genre, loading, page } = useSelector(
    (state) => state.books
  );
  const [visibleCount, setVisibleCount] = useState(20); // show 20 cards at a time
  const [showTopBtn, setShowTopBtn] = useState(false);

  // Show button if scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading && books.length === 0) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (!searchTerm) {
    return (
      <p className="text-center text-gray-400">
        Start by searching for a book...
      </p>
    );
  }

  if (!books || books.length === 0) {
    return <p className="text-center text-gray-500">No books found</p>;
  }

  // Slice books to show only 'visibleCount'
  const visibleBooks = books.slice(0, visibleCount);

  const handleViewMore = async () => {
    if (visibleCount < books.length) {
      // Show next 20 in UI
      setVisibleCount(visibleCount + 20);
    } else {
      // Fetch next 100 from API and append
      dispatch(incrementPage());
      dispatch(fetchBooksThunk({ searchTerm, genre, page: page + 1 }));
      setVisibleCount(visibleCount + 20);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {visibleBooks.map((book) => (
          <BookCard key={book.id} book={book} onFavorite={onFavorite} />
        ))}
      </div>

      {(visibleBooks.length < books.length || books.length >= visibleCount) && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleViewMore}
            className="px-6 py-2 font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            View More
          </button>
        </div>
      )}

      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed z-50 p-3 text-white transition bg-blue-600 rounded-full shadow-lg bottom-8 right-8 hover:bg-blue-700"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
