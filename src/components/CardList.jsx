import React from 'react';
import { Link } from 'react-router-dom';

const CardList = ({ movies, ratingMovies, sortingMovies, orderMovies , toggleFavorite ,favorites }) => {
  let sortedMovies = [...movies];

  if (sortingMovies === 'popular') {
    sortedMovies.sort((a, b) => b.popularity - a.popularity);
  } else if (sortingMovies === 'date') {
    sortedMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
  } else if (sortingMovies === 'rating') {
    sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
  }

  if (orderMovies === 'Ascending') {
    sortedMovies.reverse();
  }

  const filteredMovies = sortedMovies.filter((movie) => movie.vote_average >= ratingMovies);

  if (filteredMovies.length === 0) {
    return <div className="text-center text-gray-500">No movies found with the selected rating.</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {filteredMovies.map((movie, index) => (
        <div key={index} className="relative rounded-lg overflow-hidden group shadow-lg bg-white dark:bg-gray-800">
          <Link to={`/movie/${movie.id}`}>
          {movie.poster_path ? (
            

            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-72 object-cover"
            />
          ) : (
            <div className="w-full h-72 bg-gray-300 flex items-center justify-center">
              <span>No Image</span>
            </div>
          )}

          <div className="p-3 text-sm text-black dark:text-white">
            <h3 className="text-red-500 font-bold truncate">{movie.title}</h3>
            <div className="flex justify-between items-center">
              <p className="text-xs">{movie.release_date || 'No date'}</p>
              <p className="text-xs">{movie.vote_average.toFixed(1)} ⭐</p>
            </div>
            <p className="mt-1 line-clamp-3 text-gray-600 dark:text-gray-300">{movie.overview}</p>
          </div>
          </Link>
         <button
         className={`w-full cursor-pointer ${favorites.find(fav => fav.id === movie.id) ? 'bg-gray-600' : 'bg-red-500'} text-white active:scale-90`}
         onClick={() => toggleFavorite(movie)}
              >
         <i className="fas fa-heart "></i>
          {favorites.find(fav => fav.id === movie.id) ? ' Remove from Favorites' : ' Add to Favorites'}
</button>

        </div>
      ))}
    </div>
  );
};

export default CardList;
