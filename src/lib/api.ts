// import { useContext } from 'react';
// import { RouteContext } from '@/context/RouteProvider';
import {
  buildMovieDetailsUrl,
  BuildMovieDetailsUrlProps,
  buildMovieListUrl,
  BuildMovieListUrlProps,
} from './helper';

// https://medium.com/@bobjunior542/master-the-react-router-6-useloaderdata-hook-a-comprehensive-guide-38eca47eaf25

/**
 * Fetching movies from TMDb
 * @param {BuildMovieListUrlProps} props Function props
 * @returns Array of movies
 */
export async function getMovies({ routeId, page, id }: BuildMovieListUrlProps): Promise<{} | null> {
  // const { routeDispatch } = useContext(RouteContext);
  const result = await fetch(buildMovieListUrl({ routeId: routeId, page: page, id: id }));

  if (!result.ok) throw new Error('Failed to fetch movies');

  // routeDispatch({ type: 'SET_ROUTE', payload: routeId })
  return result.json();
}

/**
 * Fetching movie details from TMDb
 * @param {BuildMovieDetailsUrlProps} props Function props
 * @returns Array of movies
 */
export async function getMovie({ query, id }: BuildMovieDetailsUrlProps) {
  const result = await fetch(buildMovieDetailsUrl({ query, id }));

  if (!result.ok) throw new Error('Failed to fetch movie');

  return result.json();
}


