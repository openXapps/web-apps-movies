import { useNavigate } from "react-router-dom";
import { HeartIcon } from 'lucide-react';
import { twMerge } from "tailwind-merge";
import { useState } from "react";

type CardProps = {
  movieId: string;
  movieTitle: string;
  movieImage: string;
  favourite?: boolean;
};

export default function MovieCard({ movieId, movieImage, movieTitle, favourite }: CardProps) {
  const navigate = useNavigate();
  const [isFav, setIsFav] = useState(favourite);

  return (
    <div className="relative w-full max-w-[500px] bg-gray-500/50 rounded-lg overflow-hidden">
      <p className="text-center text-md text-ellipsis overflow-hidden text-nowrap mx-1 py-1">{movieTitle}</p>
      <div>
        <img
          className="mx-auto cursor-pointer"
          src={movieImage}
          alt={movieTitle}
          onClick={() => navigate(`/movie/${movieId}`)}
        />
        <div className="absolute bottom-0 h-12 mx-auto w-full px-3 flex items-center justify-between bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-80">
          <p>2022-01-25</p>
          <HeartIcon
            className={twMerge('cursor-pointer', isFav && 'text-orange-500')}
            strokeWidth={isFav ? 4 : 2}
            // fill="#111" not working
            onClick={() => (setIsFav(!isFav))}
          />
        </div>
      </div>
    </div>
  )
}

