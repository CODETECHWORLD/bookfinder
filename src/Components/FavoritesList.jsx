// src/components/FavoritesList.jsx
import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../redux/favoritesSlice";

export default function FavoritesList() {
  const favorites = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();

  if (!favorites.length) {
    return (
      <p className="mt-6 text-center text-gray-500">
        No favorites yet. Add some books to your favorites!
      </p>
    );
  }

  return (
    <div className="max-w-6xl px-4 mx-auto my-6">
      <h2 className="mb-6 text-2xl font-bold text-center text-[#5D688A]">
        Your Favorites
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {favorites.map((book) => (
          <div
            key={book.id}
            className="flex flex-col overflow-hidden transition-shadow duration-300 bg-white shadow-lg rounded-2xl hover:shadow-2xl"
          >
            {/* Cover Image */}
            {book.cover ? (
              <img
                src={book.cover}
                alt={book.title}
                className="object-cover w-full h-56"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-56 bg-[#FFDBB6] text-[#5D688A] font-semibold">
                No Cover
              </div>
            )}

            {/* Book Info */}
            <div className="flex flex-col flex-1 p-4">
              <h3 className="mb-1 text-lg font-semibold text-gray-800 truncate">
                {book.title}
              </h3>
              <p className="mb-3 text-sm text-gray-500 truncate">
                {book.author || "Unknown Author"}
              </p>
              <p className="mb-3 text-sm text-gray-400">
                {book.year || "N/A"}
              </p>

              {/* Remove Button */}
              <button
                onClick={() => dispatch(removeFavorite(book.id))}
                className="mt-auto px-4 py-2 text-white bg-[#F7A5A5] rounded-full hover:bg-[#FFDBB6] transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
