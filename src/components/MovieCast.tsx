import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ScrollArea, ScrollBar } from './ui/scroll-area';
import Person from './Person';

import { getMovie } from '@/lib/api';
import { RouteId } from '@/lib/enums';
import { getRoute } from '@/lib/helper';

import type { TmdbMovieCastData, TmdbMovieCreditsData } from '@/lib/types';
// import ghostPoster from '@/assets/ghost-poster.png';

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

type MovieCastProps = {
  movieId: string;
  layout: 'horizontal' | 'vertical';
}

export default function MovieCast({ movieId, layout }: MovieCastProps) {
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
        layout === 'horizontal' ? (
          <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <div className="flex w-max space-x-4 p-4">
              {movieCast.map((v, i) => {
                const imgId = 'img-' + String(i);
                return (
                  <Person
                    key={imgId}
                    imgId={imgId}
                    data={{ id: v.id, name: v.name, profile_path: v.profile_path, role: v.character }}
                    handleClick={handleCastClick} />
                )
              })}
            </div>
            <ScrollBar orientation="horizontal" forceMount={true} />
          </ScrollArea>
        ) : (
          <div className="grid gap-3 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 justify-items-center">
            {movieCast.map((v, i) => {
              const imgId = 'img-' + String(i);
              return (
                <Person
                  key={imgId}
                  imgId={imgId}
                  data={{ id: v.id, name: v.name, profile_path: v.profile_path, role: v.character }}
                  handleClick={handleCastClick} />
              )
            })}
          </div>
        )
      )}
    </>
  )
}

