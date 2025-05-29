import React from 'react';




const Favorites = ({ favorites }) => {
  if ( favorites.length === 0) { 
    return <div className="text-center text-gray-500 mt-10">No favorites added yet.</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {favorites.map((movie) => (
        <div key={movie.id} className="relative rounded-lg overflow-hidden group shadow-lg bg-white dark:bg-gray-800">
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-72 object-cover"
          />
          <div className="p-3 text-sm text-black dark:text-white">
            <h3 className="text-red-500 font-bold truncate">{movie.title}</h3>
            <p className="text-xs">{movie.release_date}</p>
            <p className="text-xs">{movie.vote_average.toFixed(1)} ⭐</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
