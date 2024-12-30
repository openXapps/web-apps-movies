import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Person from './Person';

import { getMovie } from '@/lib/api';
import { RouteId } from '@/lib/enums';
import { getRoute } from '@/lib/helper';
import type { TmdbMovieCrewData, TmdbMovieCreditsData } from '@/lib/types';

const initMovieCast: TmdbMovieCrewData[] = [
  {
    adult: false,
    gender: 0,
    id: 0,
    known_for_department: '',
    name: '',
    original_name: '',
    popularity: 0,
    profile_path: '',
    credit_id: '',
    department: '',
    job: '',
  }
]

type MovieCrewProps = {
  movieId: string;
  layout: 'horizontal' | 'vertical';
}

export default function MovieCrew({ movieId, layout }: MovieCrewProps) {
  const rrNavigate = useNavigate();
  const [movieCrew, setMovieCrew] = useState<TmdbMovieCrewData[]>(initMovieCast)

  useEffect(() => {
    function getMovieCast() {
      getMovie({ query: 'CREDITS', filter: movieId })
        .then(data => {
          let crew: TmdbMovieCrewData[] = [];
          const crewDirector: TmdbMovieCrewData[] = data.crew.filter((v: TmdbMovieCrewData) => v.job === 'Director');
          const crewProduction: TmdbMovieCrewData[] = data.crew.filter((v: TmdbMovieCrewData) => v.department === 'Production');
          const crewWriting: TmdbMovieCrewData[] = data.crew.filter((v: TmdbMovieCrewData) => v.department === 'Writing');
          crew = crewDirector.concat(crewProduction).concat(crewWriting);
          setMovieCrew(crew);
        }) as Promise<TmdbMovieCreditsData>;
    }

    getMovieCast();

    return () => { };
  }, [movieId])

  const handleCrewClick = (id: number, name: string) => {
    rrNavigate(`${getRoute(RouteId.FILTER_BY_CREW).href}/${id}/${encodeURI(name)}`);
  }

  return (
    <>
      {movieCrew.length > 1 && (
        layout === 'horizontal' ? (
          <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <div className="flex w-max space-x-4 p-4">
              {movieCrew.map((v, i) => {
                const imgId = 'img-' + String(i);
                return (
                  <Person
                    key={imgId}
                    imgId={imgId}
                    data={{ id: v.id, name: v.name, profile_path: v.profile_path, role: v.job }}
                    handleClick={handleCrewClick} />
                )
              })}
            </div>
            <ScrollBar orientation="horizontal" forceMount={true} />
          </ScrollArea>
        ) : (
          <div className="grid gap-3 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 justify-items-center">
            {movieCrew.map((v, i) => {
              const imgId = 'img-' + String(i);
              return (
                <Person
                  key={imgId}
                  imgId={imgId}
                  data={{ id: v.id, name: v.name, profile_path: v.profile_path, role: v.job }}
                  handleClick={handleCrewClick} />
              )
            })}
          </div>
        )
      )}
    </>
  )
}


