import { useNavigate } from 'react-router-dom';

import { TmdbMovieListData } from '@/lib/types';

export default function MovieCard(movie: TmdbMovieListData) {
  const rrNavigate = useNavigate();

  const handleMovieClick = () => {
    rrNavigate(`/movie/${movie.id}`)
  }

  return (
    <div className="w-full max-w-[500px] bg-gray-500/50 rounded-lg overflow-hidden">
      <p className="text-center text-lg md:text-base text-ellipsis overflow-hidden text-nowrap p-2">{movie.title}</p>
      <img
        className="mx-auto cursor-pointer"
        src={`${import.meta.env.VITE_API_MOVIE_POSTER_URL}/${movie.poster_path}`}
        alt={movie.title}
        onClick={handleMovieClick}
      />
      {/* <div className="h-10 w-full px-3 flex items-center justify-between"> */}
      <div className="flex items-center justify-between p-2">
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

