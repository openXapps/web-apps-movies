import { useState } from "react";
import { Button } from "./ui/button";
import type { TMovieListData, TmdbMovieDetailsData } from "@/lib/types";
import { copyToClipboard, decryptCipher } from "@/lib/helper";
import LoadingSpinner from "./ui/loader";

export default function MovieInfo({ movieInfo }: { movieInfo: TmdbMovieDetailsData }) {
  const [tHide, setTHide] = useState(true);
  const [tLoading, setTLoading] = useState(false);
  const [tData, setTData] = useState<TMovieListData[]>([]);

  const handleTClick = () => {
    window.scrollTo(0, document.body.scrollHeight);
    setTHide(false);
    setTLoading(true);
    fetch(decryptCipher(import.meta.env.VITE_T_URL) + movieInfo.imdb_id)
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
    <div>
      <div className="flex gap-2 items-center">
        <p className="text-gray-500 dark:text-gray-400 flex-none w-24">Explore:</p>
        <div className="flex gap-2 flex-wrap">
          <Button variant="secondary" size="sm" asChild>
            <a
              href={`https://www.imdb.com/title/${movieInfo.imdb_id}/`}
              target="_blank"
              rel="noopener noreferrer"
            >IMDb</a>
          </Button>
          <Button variant="secondary" size="sm" asChild>
            <a
              href={`https://www.themoviedb.org/movie/${movieInfo.id}/`}
              target="_blank"
              rel="noopener noreferrer"
            >TMDb</a>
          </Button>
          <Button variant="secondary" size="sm" asChild>
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURI(movieInfo.title)} trailer`}
              target="_blank"
              rel="noopener noreferrer"
            >YouTube</a>
          </Button>
          {movieInfo.homepage && <Button variant="secondary" size="sm" asChild>
            <a
              href={movieInfo.homepage}
              target="_blank"
              rel="noopener noreferrer"
            >Homepage</a>
          </Button>}
        </div>
      </div>
      <div className="mt-3 grid gap-3 grid-cols-1 sm:grid-cols-2">
        <div className="flex gap-2">
          <p className="text-gray-500 dark:text-gray-400 flex-none w-24">Genre:</p>
          <p className="text-orange-800 dark:text-orange-400 flex-1">{movieInfo.genres.map(v => v.name).join(', ')}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-gray-500 dark:text-gray-400 flex-none w-24">Released:</p>
          <p className="text-orange-800 dark:text-orange-400 flex-1">{movieInfo.release_date}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-gray-500 dark:text-gray-400 flex-none w-24">Rating:</p>
          <p className="text-orange-800 dark:text-orange-400 flex-1">{`${movieInfo.vote_average.toFixed()} (${movieInfo.vote_count} votes)`}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-gray-500 dark:text-gray-400 flex-none w-24">Runtime:</p>
          <p className="text-orange-800 dark:text-orange-400 flex-1">{`${Math.floor(movieInfo.runtime / 60)}hr ${movieInfo.runtime % 60}min`}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-gray-500 dark:text-gray-400 flex-none w-24">Country:</p>
          <p className="text-orange-800 dark:text-orange-400 flex-1">{movieInfo.production_countries.map(v => v.iso_3166_1).join(', ')}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-gray-500 dark:text-gray-400 flex-none w-24">Status:</p>
          <p className="text-orange-800 dark:text-orange-400 flex-1">{movieInfo.status}</p>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <div>
          <p className="text-gray-500 dark:text-gray-400 flex-none w-24">Story:</p>
          <div className="w-10 h-10" onClick={handleTClick} />
        </div>
        <p className="text-orange-800 dark:text-orange-400 flex-1">{movieInfo.overview}</p>
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
                <p className="text-orange-800 dark:text-orange-400 flex-1">Movie is too new 😊</p>
              </div>
            )
          )
      )}
    </div>
  )
}
