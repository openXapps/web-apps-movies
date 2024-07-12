import { TmdbMovieListData } from "@/lib/types";
import { useNavigate } from "react-router-dom";
// import { HeartIcon } from 'lucide-react';
// import { twMerge } from "tailwind-merge";
// import { useState } from "react";
import noPoster from '@/assets/ghost-poster.svg';

export default function MovieCard(movie: TmdbMovieListData) {
  const navigate = useNavigate();
  const posterUrl = import.meta.env.VITE_API_POSTER_URL;
  const poster = movie.poster_path ? `${posterUrl}/${movie.poster_path}` : noPoster;
  // const [isFav, setIsFav] = useState(favourite);
  // console.log(`${posterUrl}/${movie.poster_path}`);
  

  return (
    <div className="w-full max-w-[500px] bg-gray-500/50 rounded-lg overflow-hidden">
      <p className="text-center text-md text-ellipsis overflow-hidden text-nowrap mx-1 py-1">{movie.title}</p>
      <div className="relative">
        <img
          className="mx-auto cursor-pointer"
          src={poster}
          alt={movie.title}
          onClick={() => navigate(`/movie/${movie.id}`)}
        />
        <div className="absolute bottom-0 h-10 mx-auto w-full px-3 flex items-center justify-between bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-80">
          <p>{movie.release_date}</p>
          <p>{movie.original_language}</p>
          {/* <HeartIcon
            className={twMerge('cursor-pointer', isFav && 'text-orange-500')}
            strokeWidth={isFav ? 4 : 2}
            // fill="#111" not working
            onClick={() => (setIsFav(!isFav))}
          /> */}
        </div>
      </div>
    </div>
  )
}

