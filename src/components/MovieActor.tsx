import { useEffect, useState } from "react"

import { TmdbMovieCastData, TmdbMovieCreditsData } from "@/lib/types"
import { getMovie } from "@/lib/api"

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

export default function MovieActor({ movieId }: { movieId: string }) {
  const [movieActor, setMovieActor] = useState<TmdbMovieCastData[]>(initMovieCast)

  useEffect(() => {
    function getMovieCast() {
      getMovie({ query: 'CREDITS', movieId: movieId })
        .then(data => {
          const cast: TmdbMovieCastData[] = data.cast.filter((v: TmdbMovieCastData) => v.known_for_department === 'Acting')
          setMovieActor(cast);
        }) as Promise<TmdbMovieCreditsData>;
    }

    getMovieCast();

    return () => { };
  }, [movieId])

  return (
    <>
      {movieActor.length > 1 && (
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 justify-items-center">
          {movieActor.map(v => v.profile_path && (
            <div className="flex flex-col gap-2 items-center" key={v.id}>
              <img
                className="rounded-lg"
                src={`${import.meta.env.VITE_API_PERSON_POSTER_URL}/${v.profile_path}`}
                alt={v.name}
              />
              <div className="text-center">
                <p className="">{v.name}</p>
                <p className="text-orange-700 dark:text-orange-500">{v.character}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
