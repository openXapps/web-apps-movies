import Toolbar from "@/components/Toolbar";
import { Button } from "@/components/ui/button";
import { getMovie } from "@/lib/api";
import { LoaderFunctionProps, TmdbMovieDetailsData } from "@/lib/types";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

export default function Movie() {
  const [showT, setShowT] = useState(false);
  const movie = useLoaderData() as TmdbMovieDetailsData;
  // const posterUrl = import.meta.env.VITE_API_POSTER_URL;
  const backdropUrl = import.meta.env.VITE_API_BACKDROP_URL;

  return (
    <div className="mt-2">
      <div className="max-w-[1024px] mx-auto my-2 p-2">
        <p className="text-orange-800 dark:text-orange-400 font-bold text-xl sm:text-3xl text-ellipsis overflow-hidden text-nowrap">{movie.title}</p>
        {/* <img className="" src={`${posterUrl}/${movie.poster_path}`} alt="X" /> */}
        <img className="w-full mt-2" src={`${backdropUrl}/${movie.backdrop_path}`} alt={movie.title} />
        <div className="mt-3 grid gap-3 grid-cols-1 sm:grid-cols-2">
          <div className="flex gap-2">
            <p className="text-gray-500 dark:text-gray-400 flex-none w-24">Genre:</p>
            <p className="text-orange-800 dark:text-orange-400 flex-1">{movie.genres.map(v => v.name).join(', ')}</p>
          </div>
          <div className="flex gap-2">
            <p className="text-gray-500 dark:text-gray-400 flex-none w-24">Released:</p>
            <p className="text-orange-800 dark:text-orange-400 flex-1">{movie.release_date}</p>
          </div>
          <div className="flex gap-2">
            <p className="text-gray-500 dark:text-gray-400 flex-none w-24">Rating:</p>
            <p className="text-orange-800 dark:text-orange-400 flex-1">{`${movie.vote_average.toFixed()} (${movie.vote_count} votes)`}</p>
          </div>
          <div className="flex gap-2">
            <p className="text-gray-500 dark:text-gray-400 flex-none w-24">Runtime:</p>
            <p className="text-orange-800 dark:text-orange-400 flex-1">{`${Math.floor(movie.runtime / 60)}hr ${movie.runtime % 60}min`}</p>
          </div>
          <div className="flex gap-2">
            <p className="text-gray-500 dark:text-gray-400 flex-none w-24">Explore:</p>
            <div className="flex gap-2">
              <Button>IMDb</Button>
              <Button>TMDb</Button>
              <Button>YouTube</Button>
            </div>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <div>
            <p className="text-gray-500 dark:text-gray-400 flex-none w-24">Story:</p>
            <div className="w-7 h-7" onClick={() => alert('Torrent!')} />
          </div>
          <p className="text-orange-800 dark:text-orange-400 flex-1">{movie.overview}</p>
        </div>
        {showT ? (
          <div className="mt-3">
            Here goes the Ts :-)
          </div>
        ) : null}
        <Toolbar />
      </div>
    </div>
  );
}

export function loaderMovie({ params }: LoaderFunctionProps) {
  return getMovie('MOVIE', params.id);
}