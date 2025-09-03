// src/components/FavoritesList.jsx
import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../redux/favoritesSlice";

export default function FavoritesList() {
  const favorites = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();

  if (!favorites.length) {
    return <p className="mt-6 text-center text-gray-500">No favorites yet</p>;
  }

  return (
    <div className="my-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">Favorites</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {favorites.map((book) => (
          <div
            key={book.id}
            className="flex flex-col p-4 bg-white shadow rounded-xl"
          >
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              {book.title}
            </h3>
            <p className="mb-4 text-sm text-gray-500">
              {book.author || "Unknown Author"}
            </p>
            <button
              onClick={() => dispatch(removeFavorite(book.id))}
              className="px-3 py-1 mt-auto text-white transition bg-red-500 rounded-lg hover:bg-red-600"
            >
            Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
