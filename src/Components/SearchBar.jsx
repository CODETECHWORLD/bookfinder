import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, fetchBooksThunk } from "../redux/booksSlice";
import { addSearch } from "../redux/searchesSlice";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBar() {
  const dispatch = useDispatch();
  const { genre, books = [] } = useSelector((state) => state.books || {});
  const recentSearches = useSelector((state) => state.searches?.items || []);

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const fetchApiSuggestions = async (input) => {
    if (!input.trim()) return [];
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(input)}&limit=5`
      );
      const data = await response.json();
      return (data.docs || []).map((b) => b.title).filter(Boolean).slice(0, 5);
    } catch {
      return [];
    }
  };

  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    const lowerValue = value.toLowerCase();
    const recentMatches = (recentSearches || [])
      .filter((t) => t.toLowerCase().includes(lowerValue))
      .slice(0, 5);
    const bookMatches = (books || [])
      .map((b) => b.title)
      .filter((t) => t.toLowerCase().includes(lowerValue))
      .slice(0, 5);
    const apiMatches = (recentMatches.length + bookMatches.length < 5)
      ? await fetchApiSuggestions(value)
      : [];

    const combined = Array.from(new Set([...recentMatches, ...bookMatches, ...apiMatches]));
    setSuggestions(combined);
    setShowDropdown(combined.length > 0);
  };

  const handleSubmit = (e, val = query) => {
    e?.preventDefault();
    if (!val.trim()) return;

    dispatch(setSearchTerm(val));
    dispatch(fetchBooksThunk({ searchTerm: val, genre, page: 1 }));
    dispatch(addSearch(val));
    setQuery("");
    setSuggestions([]);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto mb-6" ref={dropdownRef}>
      <form
        onSubmit={handleSubmit}
        className="flex items-center rounded-xl overflow-hidden shadow-lg bg-[#F7A5A5]"
      >
        <input
          type="text"
          placeholder="Search books by title..."
          value={query}
          onChange={handleChange}
          className="flex-1 px-4 py-2 outline-none rounded-l-xl focus:ring-2 focus:ring-[#FFDBB6]"
        />
        <button className="px-4 text-white rounded-r-xl">
          <AiOutlineSearch size={20} />
        </button>
      </form>

      {showDropdown && (
        <ul className="absolute z-50 w-full mt-1 overflow-y-auto bg-white border rounded-lg shadow-md max-h-60">
          {suggestions.map((s, idx) => (
            <li
              key={s + idx}
              className="px-4 py-2 cursor-pointer hover:bg-[#FFDBB6]"
              onClick={() => handleSubmit(null, s)}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
