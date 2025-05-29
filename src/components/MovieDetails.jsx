import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=41d51a1a915a27b378f9debd5cbc9b3d`);
      const data = await res.json();
      setMovie(data);
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className=" max-w-3xl mx-auto p-4 text-gray-900 dark:text-white">
      
      <div className='flex flex-row items-center gap-5'>
        
        <img  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-[50%] mb-4 rounded" />
      <div className='w-[50%] ml-4 flex flex-col  justify-between gap-20'>
        <h1 className="text-3xl font-bold mb-4 ">{movie.title}</h1>
          <p><strong>Rating:</strong> ⭐ {movie.vote_average}</p>
      <p className="mt-4">{movie.overview}</p>
      <button className='w-full cursor-pointer bg-red-500 text-amber-50'
        onClick={() => window.open(`https://www.themoviedb.org/movie/${movie.id}`, '_blank')}
      >More Details ?</button>
      </div>
    
      </div>
      
    </div>
  );
}
