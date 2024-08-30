import { useLoaderData } from 'react-router-dom';

import MovieCard from "@/components/MovieCard";
import Toolbar from '@/components/Toolbar';
import Footer from '@/components/Footer';

import { TmdbMovieList } from '@/lib/types';

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

