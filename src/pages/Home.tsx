import { useLoaderData } from 'react-router-dom';
import { LoaderFunctionProps, TmdbMovieList } from '@/lib/types';
import { getMovies } from '@/lib/api';
import MovieCard from "@/components/MovieCard";
import Toolbar from '@/components/Toolbar';
import Footer from '@/components/Footer';

export default function Home() {
  const movies = useLoaderData() as TmdbMovieList;

  return (
    <div className="mt-2">
      <div className="max-w-[1024px] mx-auto my-2 p-2 grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        {movies.results.map(v => (v.poster_path && <MovieCard key={v.id} {...v} />))}
      </div>
      <Toolbar />
      <Footer />
    </div>
  )
}

export function loaderNowPlaying({ params }: LoaderFunctionProps) {
  return getMovies('/', params.page);
}

export function loaderPopular({ params }: LoaderFunctionProps) {
  return getMovies('/popular', params.page);
}

export function loaderTopRated({ params }: LoaderFunctionProps) {
  return getMovies('/toprated', params.page);
}

export function loaderUpcoming({ params }: LoaderFunctionProps) {
  return getMovies('/upcoming', params.page);
}

export function loaderOnDvD({ params }: LoaderFunctionProps) {
  return getMovies('/ondvd', params.page);
}

export function loaderFavourites() {
  return getMovies('/favourites', '0');
}