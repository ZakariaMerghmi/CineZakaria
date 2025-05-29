import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 

const Search = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  
  const fetchSearchResults = async () => {
    if (!query.trim()) return;

    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=41d51a1a915a27b378f9debd5cbc9b3d&query=${query}`
    );
    const data = await res.json();
    setMovies(data.results);
  };

  
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchSearchResults();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="p-2 rounded border"
      />
      <button
        className="p-2 cursor-pointer bg-red-500 text-white rounded ml-2"
        onClick={fetchSearchResults} 
      >
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white dark:bg-gray-800 rounded shadow p-2">
           <Link to={`/movie/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover rounded"
            />
            <h2 className="text-center mt-2 font-semibold">{movie.title}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;

