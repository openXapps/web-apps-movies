// import { useEffect } from 'react';
import MovieCard from "@/components/MovieCard";
import { movies } from '@/lib/data';

export default function Home() {

  return (
    <div className="mt-2">
      <div className="max-w-[1024px] mx-auto my-2 p-2 grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        {movies.map(v => (
          <MovieCard
            key={v.key}
            movieId={v.id}
            movieTitle={v.title}
            movieImage="https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg"
            favourite={v.favourite}
          />
        ))}
      </div>
    </div>
  )
}
