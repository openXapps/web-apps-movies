import { useState } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { TmdbMovieImage } from '@/lib/types';
import ghostBackdrop from '@/assets/ghost-backdrop.jpg';

type MovieBackdropProps = {
  movieBackdrop: TmdbMovieImage[];
  fallBack: string;
}

export default function MovieBackdrop({ movieBackdrop, fallBack }: MovieBackdropProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const totalImages = movieBackdrop.length;

  const showNextImageButton = () => {
    setCurrentImage(prevState => {
      if (prevState === totalImages - 1) return 0;
      return prevState + 1;
    })
  }

  const showPrevImageButton = () => {
    setCurrentImage(prevState => {
      if (prevState === 0) return totalImages - 1;
      return prevState - 1;
    })
  }

  return (
    <>
      {totalImages > 0 ? (
        <div className="relative w-full mt-2">
          <div className='w-full h-full flex overflow-hidden'>
            {movieBackdrop.map((v, i) => {
              const imgId = 'img-' + String(i);
              return (
                <img
                  key={imgId}
                  id={imgId}
                  className="block object-cover w-full h-full shrink-0 grow-0 ease-in-out duration-300 rounded-md"
                  style={{ translate: `${-100 * currentImage}%` }}
                  src={`${import.meta.env.VITE_API_MOVIE_BACKDROP_URL}/${v.file_path}`}
                  alt="movie backdrop"
                  onError={() => (document.getElementById(imgId) as HTMLImageElement).src = ghostBackdrop}
                />
              )
            })}
          </div>
          <button
            className="absolute block top-0 bottom-0 p-4 left-0 hover:bg-black/20 transition"
            onClick={showPrevImageButton}
          ><ChevronLeft className='h-8 w-8 text-white' /></button>
          <button
            className="absolute block top-0 bottom-0 p-4 right-0 hover:bg-black/20 transition"
            onClick={showNextImageButton}
          ><ChevronRight className='h-8 w-8 text-white' /></button>
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

