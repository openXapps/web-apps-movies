import { useContext, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

import MovieCard from "@/components/MovieCard";
import Toolbar from '@/components/Toolbar';
import Footer from '@/components/Footer';

import { AppContext } from '@/context/AppProvider';
import type { TmdbMovieList } from '@/lib/types';
import { RouteId } from '@/lib/enums';

const cleanHeader = [
  RouteId.NOW_PAYING,
  RouteId.POPULAR,
  RouteId.ON_DVD,
  RouteId.TOP_RATED,
  RouteId.UPCOMING,
  RouteId.MOVIE_BIOGRAPHY,
];

export default function Home({ routeId }: { routeId: number }) {
  const movies = useLoaderData() as TmdbMovieList;
  const { appState, appDispatch } = useContext(AppContext);

  useEffect(() => {
    appDispatch({ type: 'SET_ROUTEID', payload: routeId })
    if (cleanHeader.includes(routeId) && appState.searchScope) {
      appDispatch({ type: 'SET_SCOPE', payload: '' });
    }
    return () => { }
  }, [routeId])

  return (
    <div className="mt-2">
      {movies.total_results > 0 ? (
      <div className="max-w-[1024px] mx-auto my-2 p-2 grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        {movies.results.map(v => (v.poster_path && <MovieCard key={v.id} {...v} />))}
      </div>
      ) : (
        <div>Oops no results found</div>
      )}
      <Toolbar />
      <Footer />
    </div>
  )
}

