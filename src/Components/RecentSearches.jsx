import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm, fetchBooksThunk } from "../redux/booksSlice";
import { clearSearches } from "../redux/searchesSlice";

export default function RecentSearches() {
  const { recentSearches } = useSelector((state) => state.searches || {});
  const { genre } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  if (!recentSearches || recentSearches.length === 0) return null;

  const handleClick = (term) => {
    dispatch(setSearchTerm(term));
    dispatch(fetchBooksThunk({ searchTerm: term, genre, page: 1 }));
  };

  return (
    <div className="flex flex-wrap justify-center max-w-xl gap-3 mx-auto mb-6">
      {recentSearches.map((term, idx) => (
        <button
          key={idx}
          onClick={() => handleClick(term)}
          className="flex items-center gap-1 px-3 py-1 bg-[#FFDBB6] text-[#5D688A] rounded-full hover:bg-[#F7A5A5]"
        >
          {term}
        </button>
      ))}

      <button
        onClick={() => dispatch(clearSearches())}
        className="px-3 py-1 text-white bg-[#5D688A] rounded-full hover:bg-[#FFDBB6]"
      >
        Clear All
      </button>
    </div>
  );
}
