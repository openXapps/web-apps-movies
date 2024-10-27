import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { Button } from './ui/button';

import { getMovie } from "@/lib/api";
import { TmdbMovieImage, TmdbMovieImageData } from '@/lib/types';
import ghostBackdrop from '@/assets/ghost-backdrop.jpg';

const initMovieImage: TmdbMovieImage[] = [
  {
    aspect_ratio: 0.0,
    height: 0,
    iso_639_1: null,
    file_path: '',
    vote_average: 0.0,
    vote_count: 0,
    width: 0
  }
]

export default function MovieBackdrop({ movieId, fallBack }: { movieId: string, fallBack: string }) {
  // const [movieBackdrop, setMovieBackdrop] = useState<TmdbMovieImage[]>(initMovieImage);
  const [movieBackdrop, setMovieBackdrop] = useState<TmdbMovieImage[]>([]);
  const [currentImage, setCurrentImage] = useState(0);
  const totalImages = movieBackdrop.length;

  useEffect(() => {
    function getMovieImages() {
      getMovie({ query: 'IMAGES', filter: movieId })
        .then(data => {
          setMovieBackdrop(data.backdrops);
        }) as Promise<TmdbMovieImageData>;
    }

    getMovieImages();

    return () => { };
  }, [movieId])

  return (
    <>
      {totalImages > 0 ? (
        <div className="relative flex justify-center items-center w-full mt-2">
          <Button
            variant="outline"
            size="sm"
            className="absolute left-1 opacity-70 rounded-full"
            disabled={currentImage === 0}
            onClick={() => currentImage > 0 && setCurrentImage(prevState => prevState - 1)}
          >{`<`}</Button>
          {movieBackdrop.map((v, i) => {
            const imgId = 'img-' + String(i);
            return (
              <img
                key={imgId}
                id={imgId}
                className={twMerge(i === currentImage ? 'block' : 'hidden', 'rounded-md')}
                src={`${import.meta.env.VITE_API_MOVIE_BACKDROP_URL}/${v.file_path}`}
                alt="movie backdrop"
                onError={() => (document.getElementById(imgId) as HTMLImageElement).src = ghostBackdrop}
              />
            )
          })}
          <Button
            variant="outline"
            size="sm"
            className="absolute right-1 opacity-70 rounded-full"
            disabled={currentImage === (totalImages - 1)}
            onClick={() => setCurrentImage(prevState => prevState + 1)}
          >{`>`}</Button>
        </div>
      ) : (
        <img
          id="movie-backdrop"
          className="w-full mt-2"
          src={`${import.meta.env.VITE_API_MOVIE_BACKDROP_URL}/${fallBack}`}
          alt="movie backdrop"
          onError={() => (document.getElementById('movie-backdrop') as HTMLImageElement).src = ghostBackdrop}
        />
      )}
    </>
  )
}

