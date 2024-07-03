import { useLoaderData } from 'react-router-dom';
import { TmdbMovieList } from '@/lib/types';
import { getMovies } from '@/lib/api';
import MovieCard from "@/components/MovieCard";

export default function Home() {
  const movies = useLoaderData() as TmdbMovieList;

  return (
    <div className="mt-2">

      <div className="max-w-[1024px] mx-auto my-2 p-2 grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        {movies.results.map(v => (
          <MovieCard
            key={v.id}
            movieId={v.id}
            movieTitle={v.title}
            movieImage={`https://image.tmdb.org/t/p/w500/${v.poster_path}`}
          // favourite={false}
          />
        ))}
      </div>
    </div>
  )
}

export function loaderTrending({ params }: { params: any }) {
  return getMovies('/trending', params.page || '1');
}

export function loaderOnDvD({ params }: { params: any }) {
  return getMovies('/ondvd', params.page || '1');
}

export function loaderFavourites() {
  return getMovies('/favourites', '0');
}