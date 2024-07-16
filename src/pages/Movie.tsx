import Toolbar from "@/components/Toolbar";
import { Button } from "@/components/ui/button";
import { getMovie } from "@/lib/api";
import { LoaderFunctionProps, TMovieListData, TmdbMovieDetailsData } from "@/lib/types";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { copyToClipboard, decryptCipher } from '@/lib/helper';
import LoadingSpinner from "@/components/ui/loader";

export default function Movie() {
  const [tHide, setTHide] = useState(true);
  const [tLoading, setTLoading] = useState(false);
  const [tData, setTData] = useState<TMovieListData[]>([]);
  const movie = useLoaderData() as TmdbMovieDetailsData;
  const backdropUrl = import.meta.env.VITE_API_BACKDROP_URL;
  // const posterUrl = import.meta.env.VITE_API_POSTER_URL;

  const handleTClick = () => {
    window.scrollTo(0, document.body.scrollHeight);
    setTHide(false);
    setTLoading(true);
    fetch(decryptCipher(import.meta.env.VITE_T_URL) + movie.imdb_id)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error('Problem fetching T.');
      })
      .then((t) => {
        // console.dir(t);
        setTimeout(() => {
          setTLoading(false);
          if (t.data.movie_count > 0) {
            if (t.data.movies.length > 0) setTData(t.data.movies[0].torrents);
          }
        }, 1000);
      }).catch((error) => {
        console.log('T error: ', error.message);
        setTData([]);
        setTLoading(false);
      });
  }

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
              <Button variant="secondary" size="sm" asChild>
                <a
                  href={`https://www.imdb.com/title/${movie.imdb_id}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                >IMDb</a>
              </Button>
              <Button variant="secondary" size="sm" asChild>
                <a
                  href={`https://www.themoviedb.org/movie/${movie.id}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                >TMDb</a>
              </Button>
              <Button variant="secondary" size="sm" asChild>
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURI(movie.title)} trailer`}
                  target="_blank"
                  rel="noopener noreferrer"
                >YouTube</a>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <div>
            <p className="text-gray-500 dark:text-gray-400 flex-none w-24">Story:</p>
            <div className="w-10 h-10" onClick={handleTClick} />
          </div>
          <p className="text-orange-800 dark:text-orange-400 flex-1">{movie.overview}</p>
        </div>
        {tHide ? null : (
          tLoading
            ? (<LoadingSpinner size={32} className="mt-4 mx-auto" />)
            : (tData.length > 0
              ? (
                <div className="mt-4">
                  <p className="text-center">Click button to copy URL</p>
                  <div className="mt-3 grid gap-3 grid-cols-1 sm:grid-cols-2">
                    {tData.map((t, i) => (
                      <Button
                        key={i}
                        variant="secondary"
                        onClick={() => copyToClipboard(t.url)}
                      >{`${t.quality} (${t.size} ${t.type})`}</Button>
                    ))}
                  </div>
                </div>
              )
              : (
                <div className="mt-4 flex gap-2">
                  <p className="text-gray-500 dark:text-gray-400 flex-none w-24">Result:</p>
                  <p className="text-orange-800 dark:text-orange-400 flex-1">No Data</p>
                </div>
              )
            )
        )}
        < Toolbar />
      </div>
    </div>
  );
}

export function loaderMovie({ params }: LoaderFunctionProps) {
  return getMovie('MOVIE', params.id);
}