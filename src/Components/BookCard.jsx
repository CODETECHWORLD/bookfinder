// src/components/BookCard.jsx
export default function BookCard({ book, onFavorite }) {
  return (
    <div className="flex flex-col p-4 transition bg-white shadow rounded-xl hover:shadow-lg">
      {/* Cover */}
      {book.cover ? (
        <img
          src={book.cover}
          alt={book.title}
          className="object-cover w-full h-48 mb-3 rounded-lg"
        />
      ) : (
        <div className="flex items-center justify-center w-full h-48 mb-3 text-gray-600 bg-gray-300 rounded-lg">
          Image Not Available
        </div>
      )}

      {/* Title & Author */}
      <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
      <p className="mb-1 text-sm text-gray-500">{book.author}</p>
      <p className="mb-3 text-xs text-gray-400">📅 {book.year}</p>

      {/* Description (from single call) */}
      <p className="mb-4 text-sm text-gray-600 line-clamp-3">
        {book.description}
      </p>

      {/* Favorite Button */}
      <button
        onClick={() => onFavorite(book)}
        className="px-3 py-1 mt-auto text-white transition bg-pink-500 rounded-lg hover:bg-pink-600"
      >
        ❤️ Add to Favorites
      </button>
    </div>
  );
}
