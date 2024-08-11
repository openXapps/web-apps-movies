import {
  buildMovieDetailsUrl,
  buildMovieListUrl,
  BuildMovieListURLProps,
  MovieQueryProps
} from './helper';

// https://medium.com/@bobjunior542/master-the-react-router-6-useloaderdata-hook-a-comprehensive-guide-38eca47eaf25

/**
 * Fetching movies from TMDb
 * @param {BuildMovieListURLProps} props Function props
 * @returns Array of movies
 */
export async function getMovies({ route, page, id }: BuildMovieListURLProps): Promise<{} | null> {
  const result = await fetch(buildMovieListUrl({ route: route, page: page, id: id }));

  if (!result.ok) throw new Error('Failed to fetch movies');

  return result.json();
}

/**
 * Fetching movie details from TMDb
 * @param {MovieQueryProps} query User selection from UI
 * @param {string} id TMDb movie unique Id
 * @returns Array of movies
 */
export async function getMovie(query: MovieQueryProps, id: string | undefined) {
  const result = await fetch(buildMovieDetailsUrl(query, id));

  if (!result.ok) throw new Error('Failed to fetch movie');

  return result.json();
}


