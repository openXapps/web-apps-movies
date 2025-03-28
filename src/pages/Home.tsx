import { useContext, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

import MovieCard from "@/components/MovieCard";
import Toolbar from '@/components/Toolbar';
import Footer from '@/components/Footer';

import { AppContext } from '@/context/AppProvider';
import type { TmdbMovieList, TmdbMovieListData } from '@/lib/types';
import { RouteId } from '@/lib/enums';

export default function Home({ routeId }: { routeId: number }) {
  const { total_results, total_pages, results } = useLoaderData() as TmdbMovieList;
  const { appDispatch } = useContext(AppContext);

  useEffect(() => {
    appDispatch({ type: 'SET_ROUTEID', payload: routeId })
    return () => { }
  }, [routeId])

  function validateMovie(movie: TmdbMovieListData): boolean {
    const backInTime: number = Date.now() - (1000 * (60 * (60 * (24 * 30))));
    const movieDate: number = new Date(movie.release_date || '1970-01-01').getTime();
    console.log(movieDate, backInTime);

    if (movie.adult) return false;
    if (movie.poster_path.length === 0) return false;
    if (routeId === RouteId.NOW_PAYING && movieDate < backInTime) return false;

    return true;
  }

  return (
    <div className="mt-2">
      {total_results > 0 ? (
        <div className="max-w-[1024px] mx-auto my-2 p-2 grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
          {results.map(v => {
            return (validateMovie(v) && <MovieCard key={v.id} {...v} />)
          })}
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

