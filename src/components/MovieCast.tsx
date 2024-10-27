import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ScrollArea, ScrollBar } from './ui/scroll-area';

import { getMovie } from '@/lib/api';
import { RouteId } from '@/lib/enums';
import { getRoute } from '@/lib/helper';
import ghostPoster from '@/assets/ghost-poster.png';
import type { TmdbMovieCastData, TmdbMovieCreditsData } from '@/lib/types';

const initMovieCast: TmdbMovieCastData[] = [
  {
    adult: false,
    gender: 0,
    id: 0,
    known_for_department: '',
    name: '',
    original_name: '',
    popularity: 0,
    profile_path: '',
    cast_id: 0,
    character: '',
    credit_id: '',
    order: 0
  }
]

export default function MovieCast({ movieId }: { movieId: string }) {
  const rrNavigate = useNavigate();
  const [movieCast, setMovieActor] = useState<TmdbMovieCastData[]>(initMovieCast)

  useEffect(() => {
    function getMovieCast() {
      getMovie({ query: 'CREDITS', filter: movieId })
        .then(data => {
          const cast: TmdbMovieCastData[] = data.cast.filter((v: TmdbMovieCastData) => v.known_for_department === 'Acting')
          setMovieActor(cast);
        }) as Promise<TmdbMovieCreditsData>;
    }

    getMovieCast();

    return () => { };
  }, [movieId])

  const handleCastClick = (id: number, name: string) => {
    rrNavigate(`${getRoute(RouteId.FILTER_BY_CAST).href}/${id}/${encodeURI(name)}`);
  }

  return (
    <>
      {movieCast.length > 1 && (
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <div className="flex w-max space-x-4 p-4">
            {movieCast.map((v, i) => {
              const imgId = 'img-' + String(i);
              return (
                <figure key={imgId} className="shrink-0 w-[92px]">
                  <div className="overflow-hidden rounded-md">
                    {v.profile_path ? (
                      <img
                        id={imgId}
                        className="rounded-lg cursor-pointer"
                        src={`${import.meta.env.VITE_API_PERSON_POSTER_URL}/${v.profile_path}`}
                        alt={v.name}
                        onClick={() => handleCastClick(v.id, v.name)}
                        onError={() => (document.getElementById(imgId) as HTMLImageElement).src = ghostPoster}
                      />
                    ) : (
                      <img
                        id={imgId}
                        className="rounded-lg cursor-pointer"
                        src={ghostPoster}
                        alt={v.name}
                        onClick={() => handleCastClick(v.id, v.name)}
                      />
                    )}
                  </div>
                  <figcaption className="pt-2 text-xs text-muted-foreground">
                    <p className="text-ellipsis overflow-hidden text-nowrap">{v.name}</p>
                    <p className="text-ellipsis overflow-hidden text-nowrap text-orange-700 dark:text-orange-500">{v.character}</p>
                  </figcaption>
                </figure>
              )
            })}
          </div>
          <ScrollBar orientation="horizontal" forceMount={true} />
        </ScrollArea>
      )}
    </>
  )
}


{/* 
  <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 justify-items-center">
          {movieCast.map(v => v.profile_path && (
            <div className="flex flex-col gap-2 items-center" key={v.id}>
              <img
                className="rounded-lg cursor-pointer"
                src={`${import.meta.env.VITE_API_PERSON_POSTER_URL}/${v.profile_path}`}
                alt={v.name}
                onClick={() => handleCastClick(v.id, v.name)}
              />
              <div className="text-center">
                <p className="">{v.name}</p>
                <p className="text-orange-700 dark:text-orange-500">{v.character}</p>
              </div>
            </div>
          ))}
        </div> 
        
        */}