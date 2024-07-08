import { TmdbMovieListData } from "@/lib/types";
import { useNavigate } from "react-router-dom";
// import { HeartIcon } from 'lucide-react';
// import { twMerge } from "tailwind-merge";
// import { useState } from "react";

export default function MovieCard(movie: TmdbMovieListData) {
  const navigate = useNavigate();
  // const [isFav, setIsFav] = useState(favourite);

  return (
    <div className="relative w-full max-w-[500px] bg-gray-500/50 rounded-lg overflow-hidden">
      <p className="text-center text-md text-ellipsis overflow-hidden text-nowrap mx-1 py-1">{movie.title}</p>
      <div>
        <img
          className="mx-auto cursor-pointer"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
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

