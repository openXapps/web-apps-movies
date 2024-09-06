import { useContext, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

import MovieCard from "@/components/MovieCard";
import Toolbar from '@/components/Toolbar';
import Footer from '@/components/Footer';

import { AppContext } from '@/context/AppProvider';
import type { TmdbMovieList } from '@/lib/types';

export default function Home({ routeId }: { routeId: number }) {
  const movies = useLoaderData() as TmdbMovieList;
  const { appDispatch } = useContext(AppContext);

  useEffect(() => {
    appDispatch({ type: 'SET_ROUTEID', payload: routeId })
    return () => { }
  }, [routeId])
  
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

