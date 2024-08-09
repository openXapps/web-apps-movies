import { getMovie } from "@/lib/api"
import { TmdbMovieCastData, TmdbMovieCreditsData } from "@/lib/types"
import { useEffect, useState } from "react"

const initMovieCast = [
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

export default function MovieCast({movieId} : {movieId: string}) {
  const [movieCast, setMovieCast] = useState<TmdbMovieCastData[]>(initMovieCast)

  useEffect(() => {
    function getMovieCast() {
      getMovie('CAST', movieId)
        .then(data => {
          const cast: TmdbMovieCastData[] = data.cast.filter((v: TmdbMovieCastData) => v.known_for_department === 'Acting')
          // console.log(cast);
          setTimeout(() => {
            setMovieCast(cast);
          }, 500);
        }) as Promise<TmdbMovieCreditsData>;
    }

    getMovieCast();

    return () => { };
  }, [])

  console.log(movieCast.length);
  
  return (
    <div className="">
      {movieCast.length > 1 ? (
        movieCast.map(v => (
          <div key={v.id}>{v.character}</div>
        ))
      ) : (
        <div className="">Loading...</div>
      )}
    </div>
  )
}
