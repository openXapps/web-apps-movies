import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ghostPoster from '@/assets/ghost-poster.png';
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

export default function MovieCrew({ movieId }: { movieId: string }) {
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
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 justify-items-center">
          {movieCrew.map((v, i) => {
            const imgId = 'img-' + String(i);
            return (
              <div className="flex flex-col gap-2 items-center" key={imgId}>
                {v.profile_path ? (
                  <img
                    id={imgId}
                    className="rounded-lg cursor-pointer"
                    src={`${import.meta.env.VITE_API_PERSON_POSTER_URL}/${v.profile_path}`}
                    alt={v.name}
                    onClick={() => handleCrewClick(v.id, v.name)}
                    onError={() => (document.getElementById(imgId) as HTMLImageElement).src = ghostPoster}
                  />
                ) : (
                  <img
                    id={imgId}
                    className="rounded-lg cursor-pointer"
                    src={ghostPoster}
                    alt={v.name}
                    onClick={() => handleCrewClick(v.id, v.name)}
                  />
                )}
                <div className="text-center">
                  <p className="">{v.name}</p>
                  <p className="text-orange-700 dark:text-orange-500">{v.job}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
