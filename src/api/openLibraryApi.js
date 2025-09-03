// src/api/openLibraryApi.js

/**
 * Fetch 100 books per request from OpenLibrary API
 */
export const fetchBooks = async ({ searchTerm, genre = "All", page = 1 }) => {
  if (!searchTerm || searchTerm.trim() === "") return { docs: [], numFound: 0 };

  try {
    const limit = 100; // API fetch per request
    const params = new URLSearchParams();
    params.append("title", searchTerm);
    params.append("page", page);

    if (genre && genre !== "All") {
      params.append("subject", genre);
    }

    const response = await fetch(
      `https://openlibrary.org/search.json?${params.toString()}`
    );

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();
    console.log(data)

    const books = data.docs.map((book) => ({
      id: book.key,
      title: book.title,
      author: book.author_name ? book.author_name.join(", ") : "Unknown",
      year: book.first_publish_year || "N/A",
      cover: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : null,
      description: book.first_sentence
        ? Array.isArray(book.first_sentence)
          ? book.first_sentence[0]
          : book.first_sentence
        : book.subject
        ? `Subjects: ${book.subject.slice(0, 3).join(", ")}`
        : "No description available",
      subjects: book.subject || [],
    }));

    return {
      docs: books,
      numFound: data.numFound,
    };
  } catch (error) {
    console.error("Error fetching books:", error.message);
    return { docs: [], numFound: 0 };
  }
};
