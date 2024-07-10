import moment from 'moment';

/**
 * Helper function to build a Fetch ready URL for movie list
 * @param {string} query User selection from UI
 * @param {string} page Page to query next
 * @returns Fetch-ready URL
 */
export function buildMovieListUrl(query: string, page: string | undefined): string {
  let url = import.meta.env.VITE_API_BASE_URL;

  switch (query) {
    case '/':
      url += '/movie/now_playing'
      url += `?language=en-US&region=US`
      break;
    case '/ondvd':
      // 90 days back for 50 days duration
      const fromSeconds = (new Date().getTime() / 1000) - (60 * 60 * 24 * 90);
      const toSeconds = (60 * 60 * 24 * 50);
      url += '/discover/movie';
      url += '?include_adult=false&language=en-US&region=US&vote_count.gte=5&sort_by=popularity.desc';
      url += `&primary_release_date.gte=${moment.unix(fromSeconds - toSeconds).format('YYYY-MM-DD')}`;
      url += `&primary_release_date.lte=${moment.unix(fromSeconds).format('YYYY-MM-DD')}`;
      break;
    case '/favourites':
      url += '/movie/now_playing'
      url += `?language=en-US&region=US`
      break;
    default:
      break;
  }
  url += `&api_key=${import.meta.env.VITE_API_KEY}`;
  url += `&page=${page || '1'}`;

  return url;
}

/**
 * Helper function to build a Fetch ready URL for movie details
 * @param {string} query User selection from UI
 * @param {string} id TMDb unique move Id
 * @returns Fetch-ready URL
 */
export function buildMovieDetailsUrl(query: string, id: string | undefined): string {
  let url = import.meta.env.VITE_API_BASE_URL;

  switch (query) {
    case 'MOVIE':
      url += `/movie/${id}`
      break;
    case 'CAST':
      url += '/movie/path_to_cast_details';
      break;
    case 'DIRECTOR':
      url += '/movie/path_to_director_details'
      break;
    default:
      break;
  }
  url += `?api_key=${import.meta.env.VITE_API_KEY}`;

  return url;
}