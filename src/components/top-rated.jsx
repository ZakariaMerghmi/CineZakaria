import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // ✅ لازم تضيف هذا

export default function TopRated() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTopRated = async () => {
      const res = await fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=41d51a1a915a27b378f9debd5cbc9b3d');
      const data = await res.json();
      setMovies(data.results);
    };
    fetchTopRated();
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">🎬 Top Rated Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {movies
          .filter(movie => movie.vote_average >= 7)
          .map(movie => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden block"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{movie.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">⭐ {movie.vote_average.toFixed(1)}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

