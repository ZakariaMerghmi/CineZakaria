import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase'; 
import { useAuthState } from 'react-firebase-hooks/auth';

const Nav = () => {
  
  const [user] = useAuthState(auth);

  return (
    <div className="p-4 flex flex-col justify-center lg:flex-row lg:justify-around items-center">
      <h1 className="text-red-600 text-2xl font-bold">CineZakaria</h1>

      <ul className="flex space-x-4 justify-center items-center dark:text-gray-300">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/top-rated">Top Rated</Link></li>
        <li><Link to="/upcoming">Upcoming</Link></li>
        <li><Link to="/favorites">Favorites</Link></li>
        <li><Link to="/Search">Search</Link></li>
          {user ? (
      <li>
        <button
          onClick={() => auth.signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </li>
    ) : (
      <li>
        <Link
          to="/AuthForm"
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
        >
          Login
        </Link>
      </li>
    )}
          
        
      </ul>
     

      
    </div>
  );
};

export default Nav;
