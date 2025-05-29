import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Main from './components/Main';
import AuthForm from './components/AuthForm';
import ProtectedRoute from './components/ProtectedRoute';
import { Suspense, lazy } from "react";


function App() {
const Favorites = lazy(() => import('./components/favorites'));
const TopRated = lazy(() => import('./components/top-rated'));
const UpcomingMovies = lazy(() => import('./components/upcoming'));
const Search = lazy(() => import('./components/Search'));
const MovieDetails = lazy(() => import('./components/MovieDetails'));


  const [trendingMovies, setTrendingMovies] = useState([]);
  const [favorites, setFavorites] = useState([]); 
   const handleAddFavorite = (movie) => {
    if (!favorites.find((fav) => fav.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
    else {
      setFavorites(favorites.filter((fav) => fav.id !== movie.id));
    }
  }
     
    //load fv from LS
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  
  //update LS
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);


  useEffect(() => {
    fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=41d51a1a915a27b378f9debd5cbc9b3d')
      .then(response => response.json())
      .then(data => setTrendingMovies(data.results))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="grid  grid-rows-[80px_1fr] h-screen absolute left-0 right-0 top-0 bottom-0">
      <Nav />
       <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
      <Routes>
        <Route
  path="/"
  element={
    <Main
      trendingMovies={trendingMovies}
      favorites={favorites}
      handleAddFavorite={handleAddFavorite}
    />
  }
/>
        <Route path="/top-rated" element={<TopRated/>} />
        <Route path="/upcoming" element={<UpcomingMovies/>} /> 
        <Route path="/favorites"element={ <ProtectedRoute> <Favorites favorites={favorites}/> </ProtectedRoute>  } />
        <Route path="/AuthForm" element={<AuthForm/>} />
        <Route path="/Search" element={<Search/>} />
        <Route path="/movie/:id" element={<MovieDetails />} /> 
        <Route path="*" element={<h1 className="text-center text-2xl">Page Not Found</h1>} />

      </Routes>
      </Suspense>
      <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 px-6 py-8 mt-12">
  <div className=" max-w-6xl mx-auto grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
    <div>
      <h2 className="text-2xl font-bold text-red-500">🎬 CineZakaria</h2>
      <p className="text-sm mt-2">Discover top movies, reviews, and ratings with style.</p>
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
      <ul className="space-y-1">
        <li><a href="/" className="hover:text-red-500">Home</a></li>
        <li><a href="/top-rated" className="hover:text-red-500">Top Rated</a></li>
        <li><a href="/upcoming" className="hover:text-red-500">Upcoming</a></li>
        <li><a href="/favorites" className="hover:text-red-500">Favorites</a></li>
      </ul>
    </div>
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
      <div className="flex gap-4 text-xl">
        <a href="#" className="hover:text-red-500"><i className="fab fa-instagram"></i></a>
        <a href="#" className="hover:text-red-500"><i className="fab fa-github"></i></a>
        <a href="#" className="hover:text-red-500"><i className="fab fa-linkedin"></i></a>
      </div>
    </div>
    
  </div>

  <div className="mt-10 border-t pt-4 text-center text-sm text-gray-500 dark:text-gray-400">
    &copy; {new Date().getFullYear()} CineZakaria. All rights reserved.
  </div>
</footer>
    </div>
  );
}

export default App;
