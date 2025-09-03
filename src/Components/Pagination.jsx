import { useDispatch, useSelector } from "react-redux";
import { setPage, fetchBooksThunk } from "../redux/booksSlice";

export default function Pagination() {
  const dispatch = useDispatch();
  const { searchTerm, genre, page, numFound } = useSelector(
    (state) => state.books
  );

  const totalPages = Math.ceil(numFound / 20); // since 20 books per page

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    dispatch(setPage(newPage));
    dispatch(fetchBooksThunk({ searchTerm, genre, page: newPage }));
  };

  if (!searchTerm || totalPages <= 1) return null; // hide if no pagination needed

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 text-sm bg-gray-300 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span className="px-4 py-2 font-semibold text-gray-700">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
