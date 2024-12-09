import { useContext, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

import MovieCard from "@/components/MovieCard";
import Toolbar from '@/components/Toolbar';
import Footer from '@/components/Footer';

import { AppContext } from '@/context/AppProvider';
import type { TmdbMovieList } from '@/lib/types';
import { RouteId } from '@/lib/enums';

export default function Home({ routeId }: { routeId: number }) {
  const { total_results, total_pages, results } = useLoaderData() as TmdbMovieList;
  const { appDispatch } = useContext(AppContext);

  useEffect(() => {
    appDispatch({ type: 'SET_ROUTEID', payload: routeId })
    return () => { }
  }, [routeId])

  return (
    <div className="mt-2">
      {total_results > 0 ? (
        <div className="max-w-[1024px] mx-auto my-2 p-2 grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
          {results.map(v => (
            !v.adult &&
            (v.vote_count > 4 || routeId === RouteId.UPCOMING) &&
            v.poster_path &&
            <MovieCard key={v.id} {...v} />
          ))}
        </div>
      ) : (
        <div className='text-center text-xl mt-10'>
          <p>Oops no results found</p>
        </div>
      )}
      <Toolbar />
      <Footer totalPagesFromResult={total_pages} />
    </div>
  )
}

