// src/components/Header.jsx
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  return (
    <header className="bg-[#F7A5A5] shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-6xl px-6 py-4 mx-auto">
        <h1 className="text-2xl font-bold text-[#5D688A]">📚 Book Finder</h1>

        <nav className="flex items-center gap-4">
          <Link
            to="/favorites"
            className={`px-4 py-2 rounded-full text-sm ${
              location.pathname === "/favorites"
                ? "bg-[#5D688A] text-white"
                : "bg-[#FFDBB6] text-[#5D688A] hover:bg-[#FFF2EF]"
            }`}
          >
            Favorites
          </Link>
          {/* <Link
            to="/genres"
            className={`px-4 py-2 rounded-full text-sm ${
              location.pathname === "/genres"
                ? "bg-[#5D688A] text-white"
                : "bg-[#FFDBB6] text-[#5D688A] hover:bg-[#FFF2EF]"
            }`}
          >
            Genres
          </Link> */}
        </nav>
      </div>
    </header>
  );
}
