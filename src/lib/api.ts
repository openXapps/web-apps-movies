import type { TmdbMovieDetailsData, TmdbMovieList } from './types';
import { buildMovieDetailsUrl, buildMovieListUrl } from './helper';
import { LoaderFunction } from 'react-router-dom';

// https://medium.com/@bobjunior542/master-the-react-router-6-useloaderdata-hook-a-comprehensive-guide-38eca47eaf25

/**
 * Fetching movies from TMDb
 * @param {string} query User selection from UI
 * @param {string} page Page to query next
 * @returns Array of movies
 */
export async function getMovies(query: string, page: string | undefined): Promise<TmdbMovieList> {

  const result = (await fetch(buildMovieListUrl(query, page)));

  if (!result.ok) throw new Error('Failed to fetch movies');

  return result.json();
}

/**
 * Fetching movie details from TMDb
 * @param {string} query User selection from UI
 * @param {string} id TMDb movie unique Id
 * @returns Array of movies
 */
// export async function getMovie(query: string, id: string): Promise<TmdbMovieDetailsData> {
  export async function getMovie(query: string, id: string): Promise<TmdbMovieDetailsData> {

  const result = (await fetch(buildMovieDetailsUrl(query, id)));

  if (!result.ok) throw new Error('Failed to fetch movie');

  return result.json();
}


