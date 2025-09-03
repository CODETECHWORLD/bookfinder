import { useSelector, useDispatch } from "react-redux";
import { setGenre, fetchBooksThunk, resetBooks } from "../redux/booksSlice";

export default function GenreFilter() {
  const dispatch = useDispatch();
  const { books, genre, searchTerm } = useSelector((state) => state.books);

  // Extract top 10 unique genres
  const uniqueGenres = [
    "All",
    ...new Set(books.flatMap((book) => book.subjects || [])),
  ].slice(0, 10);

  if (uniqueGenres.length <= 1) return null;

  const handleGenreChange = (selectedGenre) => {
    dispatch(resetBooks());
    dispatch(setGenre(selectedGenre));
    if (searchTerm) {
      dispatch(fetchBooksThunk({ searchTerm, genre: selectedGenre, page: 1 }));
    }
  };

  const handleClear = () => {
    dispatch(resetBooks());
    dispatch(setGenre("All"));
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 my-6">
      {uniqueGenres.map((g) => (
        <button
          key={g}
          onClick={() => handleGenreChange(g)}
          className={`px-4 py-2 rounded-full text-sm ${
            genre === g
              ? "bg-[#5D688A] text-white"
              : "bg-[#FFDBB6] text-[#5D688A] hover:bg-[#F7A5A5]"
          }`}
        >
          {g}
        </button>
      ))}

      {/* Clear button */}
      {genre !== "All" && (
        <button
          onClick={handleClear}
          className="px-4 py-2 text-white bg-[#5D688A] rounded-full hover:bg-[#F7A5A5]"
        >
          Clear
        </button>
      )}
    </div>
  );
}
