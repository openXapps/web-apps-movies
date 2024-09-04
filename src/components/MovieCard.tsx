import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { TmdbMovieListData } from "@/lib/types";

import { AppContext } from '@/context/AppProvider';
import { RouteId } from "@/lib/routes";

export default function MovieCard(movie: TmdbMovieListData) {
  const { appDispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const handleMovieClick = () => {
    appDispatch({ type: 'SET_ROUTEID', payload: RouteId.MOVIE_BIOGRAPHY });
    navigate(`/movie/${movie.id}`)
  }

  return (
    <div className="w-full max-w-[500px] bg-gray-500/50 rounded-lg overflow-hidden">
      <p className="text-center text-md text-ellipsis overflow-hidden text-nowrap mx-1 py-1">{movie.title}</p>
      <img
        className="mx-auto cursor-pointer"
        src={`${import.meta.env.VITE_API_MOVIE_POSTER_URL}/${movie.poster_path}`}
        alt={movie.title}
        onClick={handleMovieClick}
      />
      <div className="h-10 w-full px-3 flex items-center justify-between">
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
  )
}

