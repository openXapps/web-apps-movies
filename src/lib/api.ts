import { buildMovieDetailsUrl, buildMovieListUrl } from './helper';

// https://medium.com/@bobjunior542/master-the-react-router-6-useloaderdata-hook-a-comprehensive-guide-38eca47eaf25

/**
 * Fetching movies from TMDb
 * @param {string} query User selection from UI
 * @param {string} page Page to query next
 * @returns Array of movies
 */
export async function getMovies(query: string, page: string | undefined): Promise<{} | null> {

  const result = await fetch(buildMovieListUrl(query, page));

  if (!result.ok) throw new Error('Failed to fetch movies');

  return result.json();
}

/**
 * Fetching movie details from TMDb
 * @param {string} query User selection from UI
 * @param {string} id TMDb movie unique Id
 * @returns Array of movies
 */
export async function getMovie(query: string, id: string | undefined) {
console.log(buildMovieDetailsUrl(query, id));

  const result = await fetch(buildMovieDetailsUrl(query, id));

  if (!result.ok) throw new Error('Failed to fetch movie');

  return result.json();
}


