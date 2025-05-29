import React, { useState } from 'react';
import CardList from './CardList';

const Main = ({ trendingMovies, handleAddFavorite, favorites }) => {
  const [rating, setRating] = useState(0);
  const [sortBy, setSortBy] = useState('popular');
  const [order, setOrder] = useState('Descending');

  return (
    <section>
      <header className="p-4 flex justify-center items-center">
        <div className="flex gap-4 items-center">
          <ul className="flex gap-4">
            <li
              onClick={() => setRating(0)} 
              className={`cursor-pointer ${rating === 0 ? 'border-b-2 border-red-500' : 'opacity-60'}`}
            >
              All
            </li>

            {[8, 7, 6].map((value) => (
              <li
                key={value}
                onClick={() => setRating(value)}
                className={`cursor-pointer ${rating === value ? 'border-b-2 border-red-500' : 'opacity-60'}`}
              >
                {value}+ star
              </li>
            ))}
          </ul>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="popular">Sort By</option>
            <option value="date">Date</option>
            <option value="rating">Rating</option>
          </select>

          <select value={order} onChange={(e) => setOrder(e.target.value)}>
            <option value="Descending">Descending</option>
            <option value="Ascending">Ascending</option>
          </select>
        </div>
      </header>

      <CardList
        movies={trendingMovies}
        ratingMovies={rating}
        sortingMovies={sortBy}
        orderMovies={order}
        toggleFavorite={handleAddFavorite}
        favorites={favorites}
      />
    </section>
  );
};

export default Main;
